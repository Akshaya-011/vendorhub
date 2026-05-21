/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef0ff',
          100: '#e0e4ff',
          200: '#c7cdfe',
          300: '#a4adfd',
          400: '#8087fc',
          500: '#5B5EF7',
          600: '#4642ee',
          700: '#3832d4',
          800: '#2d2aac',
          900: '#282888',
          950: '#17164f',
        },
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        background: '#F7F8FC',
        darktext: '#111827',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }
    },
  },
  plugins: [],
}
