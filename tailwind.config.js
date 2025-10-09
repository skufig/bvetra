/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#1E1E1E",
        // Light theme gray-gold
        'gold-50': '#fbf8f4',
        'gold-100': '#f5efe0',
        'gold-200': '#e9dfc2',
        'gold-400': '#cbb88f',
        'gold-600': '#a6874f',
        'gold-800': '#7a5a2e',
        // Dark theme true dark coffee palette (darker surfaces)
        'coffee-900': '#0b0a09',
        'coffee-800': '#13110f',
        'coffee-700': '#1e1410',
        'coffee-600': '#2a1e1a',
        'coffee-400': '#5b3a2a'
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 }
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        slideInRight: 'slideInRight 320ms cubic-bezier(.2,.9,.3,1) both',
        slideOutRight: 'slideOutRight 240ms cubic-bezier(.4,.0,.2,1) both',
        float: 'float 4s ease-in-out infinite'
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(2,6,23,0.24)'
      }
    },
  },
  plugins: [],
}
