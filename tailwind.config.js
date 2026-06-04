/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#4F46E5',
        surface: '#1A1035',
        accent: '#A78BFA',
      },
      animation: {
        stamp: 'stamp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
        bounce: 'bounce 1s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        stamp: { '0%': { transform: 'scale(0)', opacity: '0' }, '60%': { transform: 'scale(1.3)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { transform: 'translateY(20px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
      }
    }
  },
  plugins: []
}
