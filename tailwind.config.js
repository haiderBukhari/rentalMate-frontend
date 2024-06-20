/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#01A664',
        'primaryLig': '#D6FFD8',
        'grayBr': '#808080',
        'grayHead': '#666666',
      },
      backgroundImage: (theme) => ({
        "gradient-box":
          "linear-gradient(145deg, rgba(244, 244, 244, 0.40) -4.23%, rgba(244, 244, 244, 0.20) 102.58%, rgba(244, 244, 244, 0.20) 102.58%)",
      }),
    },
  },
  plugins: [],
};
