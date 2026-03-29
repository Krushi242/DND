/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005948",
        accent: {
          DEFAULT: "#F26A21",
          hover: "#FF4700",
        },
        background: "#F2F4F0",
        card: "#FAF9F6",
        heading: "#1F1F1F",
        text: "#333333",
        subtext: "#6C6C6C",
        white: "#FFFFFF",
      },
      fontFamily: {
        heading: ["Bricolage Grotesque", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      spacing: {
        '8': '8px',
        '80': '80px',
      },
      borderRadius: {
        '12': '12px',
        '16': '16px',
      },
      maxWidth: {
        '1200': '1200px',
        '1440': '1440px',
      },
      lineHeight: {
        '1.2': '1.2',
      },
    },
  },
  plugins: [],
}
