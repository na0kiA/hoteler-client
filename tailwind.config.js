module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  daisyui: {
    themes: ["dark"],
  },
  theme: {
    extend: {
      colors: {
        'blue-link': '#6FE9FE',
      },
      fontSize: {
        ssm: '0.6rem',
      }
    },
  },
  plugins: [require("daisyui")],
};
