/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#14552d',
        leaf: '#4b8d2c',
        brandBlue: '#0757a5',
        ink: '#101411',
        cream: '#f6f5ef',
        mist: '#e9efe7'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(16,20,17,.10)'
      }
    }
  },
  plugins: []
}
