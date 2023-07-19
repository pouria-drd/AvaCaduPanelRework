/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2lg": "1153px",
        "2md": "935px",
      },

      colors: {
        "ava-gray": "#80848F",
        "ava-black": "#292D36",
        "ava-green": "#4A7337",
        "ava-gray-2": "#959EA6",
        "ava-orange": "#FC573B",
        "ava-success": "#4CAF50",

        "ava-info": "#5464B4",

        "ava-light-green": "#DCEAD7",

        "ava-bg-red": "#FEEBF4",
        "ava-bg-blue": "#EBEFFE",
        "ava-bg-gray": "#F8F7FF",
        "ava-bg-green": "#F6FFF8",
        "ava-bg-white": "#F9F7F3",

        "ava-nav-bg-gray": "#F6F8FF",

        "ava-panel-bg-gray": "#F6F9FF",

        "ava-bg-alert-info": "#F0F2FF",
        "ava-bg-alert-error": "#FFEBED",
        "ava-bg-alert-danger": "#FFFDF0",
        "ava-bg-alert-success": "#ECFCF0",

        "ava-info-bg-red": "#FFEBED",
        "ava-info-bg-green": "#DDF5E3",
        "ava-info-bg-purple": "#E4E7FF",
        "ava-info-bg-lightBlue": "#CBF8F3",
      },

      fontFamily: {
        peyda: "Peyda",
        tanha: "tanha",
        yekanX: "IRANYekanX",
        iransans: "iransans",
        bjn: "Bahij Nazanin",
      },

      borderRadius: {
        ava7: "7px",
        ava10: "10px",
      },
    },
  },
  plugins: [],
};
