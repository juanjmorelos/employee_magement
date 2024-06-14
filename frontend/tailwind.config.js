/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#003B73",
          "secondary": "#0074B7",
          "accent": "#60A3D9",
          "neutral": "#BFD7ED",           
          "base-100": "#ffffff",
          "info": "#0369a1",
          "success": "#15803d",   
          "warning": "#ca8a04",
          "error": "#be123c",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}
