const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [require("flowbite/plugin")],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        fractul: "Fractul",
      },
      colors: {
        primary: "#545FFF",
        danger: "#ED5145",
        light: "#E1E1E1",
        secondary: "#424242",
        success: "#89DAB8",
      },
    },
  },
};

module.exports = config;
