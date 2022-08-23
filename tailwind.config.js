/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Nunito'"],
      },
      colors: {
        dark: '#4A558E',
        black: '#000000',
        blue: '#5C9AFF',
        'blue-100': '#E2EDFF',
        'blue-500': '#D4E4FF',
        light: '#FDFFFF',
        red: '#FF6663',
        orange: '#FF781E',
        'orange-100': '#FFEEE3',
        'orange-500': '#FFE4D1',
      },
      maxWidth: {
        20: '5rem',
      },
      boxShadow: {
        'inset-light': 'inset 0px 2px 12px rgba(75, 104, 206, 0.2)',
        'inset-blue': 'inset 0px 0px 12px rgba(42, 47, 180, 0.3)',
      },
      spacing: {
        '1/8': 'calc(100%/8)',
        '1/7': 'calc(100%/7)',
        '1/6': 'calc(100%/6)',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },
    },
  },
  plugins: [],
};
