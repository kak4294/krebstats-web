// tailwind.config.js (v4 manual stub)
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: { 
      extend: {
        colors: {
          primary: '#ff9a5a',
          'primary-light': '#fff1e6',
          'primary-dark': '#ff8540',
          background: '#ffffff',
          text: {
            primary: '#333333',
            secondary: '#5a5a5a'
          }
        },
        boxShadow: {
          card: '0 6px 20px rgba(255, 154, 90, 0.08)',
          'card-hover': '0 10px 25px rgba(255, 154, 90, 0.12)',
          button: '0 2px 6px rgba(255, 154, 90, 0.3)',
          'button-hover': '0 4px 10px rgba(255, 154, 90, 0.4)'
        }
      } 
    },
    plugins: [],
  }
  