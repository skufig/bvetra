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
        // Light theme: серое золото
        'gold-50': '#fbf8f4',
        'gold-100': '#f5efe0',
        'gold-200': '#e9dfc2',
        'gold-400': '#cbb88f',
        'gold-600': '#a6874f',
        'gold-800': '#7a5a2e',
        // Dark theme: глубокие кофейные тона
        'coffee-900': '#070605',
        'coffee-800': '#0f0d0c',
        'coffee-700': '#1b1512',
        'coffee-600': '#33241c',
        'coffee-400': '#6b4a36',
        // utility
        muted: '#9a8f84'
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
        floatSubtle: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
          '100%': { transform: 'translateY(0)' }
        },
        motionDash: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '80%': { transform: 'translateX(36px)', opacity: 0 },
          '100%': { transform: 'translateX(64px)', opacity: 0 }
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        slideInRight: 'slideInRight 320ms cubic-bezier(.2,.9,.3,1) both',
        slideOutRight: 'slideOutRight 240ms cubic-bezier(.4,.0,.2,1) both',
        floatSubtle: 'floatSubtle 3.8s ease-in-out infinite',
        motionDash: 'motionDash 700ms linear infinite',
        fadeInUp: 'fadeInUp 420ms ease both'
      },
      boxShadow: {
        'elevated': '0 10px 30px rgba(2,6,23,0.18)'
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(.2,.9,.3,1)'
      }
    }
  },
  plugins: [],
}
