export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cloud-dancer": "#121212",
        "earth-brown": "#8E735B",
        "stone-gray": "#A1A1AA",
        "luxury-dark": "#1C1C1E",
        "luxury-black": "#F3F4F1",
        "accent-neon": "#D4AF37",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
