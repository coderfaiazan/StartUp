/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ... other extensions
      animation: {
        chatOpen: "chatOpen 0.3s ease-out",
        shine: "shine 3s linear infinite",
      },
    },
  },
  plugins: [],
};
