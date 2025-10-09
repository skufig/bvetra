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
        // Neutral
        graphite: "#1E1E1E",
        // Light theme: серое золото (grey-gold)
        'gold-50': '#fbf8f4',
        'gold-100': '#f5efe0',
        'gold-200': '#e9dfc2',
        'gold-400': '#cbb88f',
        'gold-600': '#a6874f',
        'gold-800': '#7a5a2e',
        // Dark theme: кофе с молоком (coffee-with-milk)
        'coffee-50': '#fbf7f6',
        'coffee-100': '#f0e7e2',
        'coffee-200': '#dcc7bb',
        'coffee-400': '#b98f74',
        'coffee-600': '#8d5f47',
        'coffee-800': '#5b3a2a',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 }
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        slideInRight: 'slideInRight 320ms cubic-bezier(.2,.9,.3,1) both',
        slideOutRight: 'slideOutRight 240ms cubic-bezier(.4,.0,.2,1) both',
        fadeInUp: 'fadeInUp 420ms ease both'
      }
    },
  },
  plugins: [],
}
