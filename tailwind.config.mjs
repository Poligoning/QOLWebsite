/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#e0f0ec',
        background: '#030807',
        primary: '#92dac7',
        secondary: '#237b63',
        accent: '#3fd2aa',
      },
      fontFamily: {
        sans: ['var(--font-comfortaa)', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
