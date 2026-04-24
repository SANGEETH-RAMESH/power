/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-main': '#2B5BA8',
        'blue-2': '#1e4282',
        'blue-3': '#0d2554',
        'blue-hi': '#4a7fd4',
        'green-main': '#5A8C2E',
        'green-hi': '#79bc3c',
        'ink': '#04101f',
        'ink-2': '#081828',
        'muted': '#6a80a8',
        'light': '#c8d8f0',
        'white-soft': '#f2f7ff',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        dm: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        blink: 'blink 2s infinite',
        floatCard: 'floatCard 4s ease-in-out infinite',
        ticker: 'ticker 22s linear infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.2' } },
        floatCard: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}
