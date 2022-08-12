/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./app/**/*.tsx"],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  variant: {},
  plugins: [require("@tailwindcss/forms")],
};
