/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paytmBlue: '#00BAF2',
        paytmDeepBlue: '#002970',
        paytmDarkBlue: '#002E6E',
        paytmGrayBg: '#F5F7FA',
        paytmSuccess: '#16A34A',
      },
      borderRadius: {
        card: '12px',
        btn: '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
