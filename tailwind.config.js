/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#07130d',
        ink: '#0e1f16',
        moss: '#163323',
        forest: '#1b6b3a',
        leaf: '#4f9a3a',
        lime: '#c5e86c',
        gold: '#d4a23c',
        brandBlue: '#0b4888',
        cream: '#f5f2ea',
        sand: '#ebe4d2',
        mist: '#e6ede2'
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(14,31,22,.10)',
        lift: '0 30px 80px -30px rgba(7,19,13,.45)'
      },
      keyframes: {
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } }
      },
      animation: {
        marquee: 'marquee 38s linear infinite'
      }
    }
  },
  plugins: []
}
