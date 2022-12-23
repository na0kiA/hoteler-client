module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  // theme: {
  //   extend: {},
  // },
  daisyui: {
    themes: ["valentine"],
  },
  plugins: [require("daisyui")],
};
