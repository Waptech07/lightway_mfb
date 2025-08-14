/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       colors: {
        red700: "var(--secondary-700)",
        blue700: "var(--primary-700)",
      },
    },
  },
  plugins: [],
};
