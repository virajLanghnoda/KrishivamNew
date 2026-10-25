/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // The whole palette. Anything else on the page is one of these at an opacity.
      colors: {
        night: '#07130d',
        forest: '#1b6b3a',
        lime: '#c5e86c',
        cream: '#f5f2ea',
        sand: '#ebe4d2'
      },
      fontFamily: {
        // Manrope: headings, navigation, buttons, numbers. Inter: body copy, labels,
        // specs. Playfair Display: brand statements and quotes.
        display: ['"Manrope Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(7,19,13,.10)',
        lift: '0 30px 80px -30px rgba(7,19,13,.45)'
      },
      keyframes: {
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } }
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'spin-slow': 'spin-slow 24s linear infinite'
      }
    }
  },
  plugins: []
}
