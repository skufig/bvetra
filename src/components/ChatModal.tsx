'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FiX, FiSend, FiLoader, FiZap, FiMessageCircle, FiMic } from 'react-icons/fi';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useLanguage } from "../context/LanguageContext";


type Msg = { id: string; role: 'user' | 'assistant' | 'system'; text: string };

export default function ChatModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'connected' | 'connecting' | 'error'>('connected');
  const [messageCount, setMessageCount] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!open) return;
    const sysMsg: Msg = {
      id: 'sys-1',
      role: 'system',
      text: isEn
        ? 'You are a premium assistant for Bvetra. Help users book transfers and answer concisely.'
        : 'Вы премиальный помощник Bvetra. Помогайте оформлять трансферы и отвечайте кратко.',
    };
    setMessages([sysMsg]);
    setInput('');
    setStatus('connected');
    setMessageCount(0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, isEn]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    setMessageCount(prev => prev + 1);
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const isBooking = /бронь|заявка|transfer|book/i.test(text);
    if (isBooking) {
      try {
        const bookingPayload = {
          name: 'Всеволод',
          phone: '+375291234567',
          email: 'user@example.com',
          from: 'Минск',
          to: 'Москва',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString(),
          notes: 'Оформлено через чат',
        };
        await fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload),
        });
        const confirmMsg: Msg = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: isEn
            ? 'Booking sent successfully. We will contact you shortly.'
            : 'Заявка отправлена. Мы скоро свяжемся с вами.',
        };
        setMessages(prev => [...prev, confirmMsg]);
      } catch {
        setMessages(prev => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: isEn ? 'Error sending booking.' : 'Ошибка при отправке заявки.',
          },
        ]);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, messages }),
      });
      const json = await res.json();
      const replyText =
        res.ok && json?.reply
          ? json.reply
          : isEn
          ? 'Sorry, something went wrong.'
          : 'Извините, произошла ошибка.';
      const assistantMsg: Msg = { id: `a-${Date.now()}`, role: 'assistant', text: replyText };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: isEn ? 'Network error' : 'Ошибка сети',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0b0c1a] via-[#0e1224] to-[#0b0c1a] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-800 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              status === 'connected'
                ? 'bg-green-400'
                : status === 'connecting'
                ? 'bg-yellow-400 animate-pulse'
                : 'bg-red-500'
            }`}
          />
          <h2 className="text-xl font-bold tracking-tight">
            {isEn ? 'Bvetra Assistant' : 'Помощник Bvetra'}
          </h2>
        </div>
        <button onClick={onClose} className="p-2 rounded hover:bg-white/10">
          <FiX size={20} />
        </button>
      </div>

      {/* Stats */}
      <div className="px-6 py-2 text-sm text-indigo-300 flex justify-between items-center border-b border-indigo-900 bg-[#0f172a]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FiZap size={14} /> {isEn ? 'Status:' : 'Статус:'} {status}
          </div>
          <div className="flex items-center gap-2">
            <FiMessageCircle size={14} /> {messageCount} {isEn ? 'messages' : 'сообщений'}
          </div>
        </div>
        <div className="text-xs text-gray-400">
          {isEn ? 'Powered by GPT-4o' : 'На базе GPT-4o'}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent"
      >
        {messages.map(m => (
          <div
            key={m.id}
            className={`max-w-[80%] ${
              m.role === 'user' ? 'ml-auto bg-indigo-600' : 'bg-gray-800'
            } p-3 rounded-xl shadow`}
          >
            <div className="text-sm whitespace-pre-wrap">{m.text}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-indigo-800 bg-[#0f172a] flex flex-col md:flex-row gap-3">
        <input
          value={input || transcript}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input || transcript)}
          placeholder={
            isEn ? 'Ask anything or create a booking…' : 'Спросите что угодно или оформите бронь…'
          }
          className="flex-1 px-4 py-3 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        />
        <button
          onClick={() => sendMessage(input || transcript)}
          disabled={loading}
          className="px-5 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
          {isEn ? 'Send' : 'Отправить'}
        </button>
        <button
          onClick={() => {
            resetTranscript();
            SpeechRecognition.startListening({
              language: isEn ? 'en-US' : 'ru-RU',
            });
          }}
          className="px-4 py-3 rounded-full bg-gray-700 hover:bg-gray-600 transition text-white flex items-center gap-2"
        >
          <FiMic />
          {listening ? (isEn ? 'Listening…' : 'Слушаю…') : isEn ? 'Voice' : 'Голос'}
        </button>
      </div>

      {/* Quick commands */}
      <div className="px-6 py-4 border-t border-indigo-900 bg-[#0f172a] flex flex-wrap gap-3 justify-center">
        {[
          { label: isEn ? 'Create booking' : 'Оформить бронь' },
          { label: isEn ? 'Show fleet' : 'Показать автопарк' },
          { label: isEn ? 'Contact manager' : 'Связаться с менеджером' },
          { label: isEn ? 'Pricing info' : 'Узнать цену' },
        ].map(cmd => (
          <button
            key={cmd.label}
            onClick={() => {
              setInput(cmd.label);
              sendMessage(cmd.label);
            }}
            className="px-4 py-2 rounded-full border border-indigo-500 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-medium hover:scale-105 transition"
          >
            {cmd.label}
          </button>
        ))}
      </div>
    </div>
  );
}
