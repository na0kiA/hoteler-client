module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  // daisyui: {
  //   themes: ["black"],
  // },
  theme: {
    extend: {
      colors: {
        'blue-link': '#6FE9FE',
      },
    },
  },
  plugins: [require("daisyui")],
};
