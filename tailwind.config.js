/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#1b1b24",
          '50':'#676789',
          '100':'#5e5e7e',
          '200':'#565672',
          '300':'#4d4d67',
          '400':'#45455c',
          '500':'#3d3d51',
          '600':'#343446',
          '700':'#2c2c3a',
          '800':'#23232f',
          '900':'#131319',
        },
      },
    },
  },
  plugins: [],
};
