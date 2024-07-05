import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#69b6cf",
        "primary-hover": "#80c1d6",
        "primary-active": "#87c5d9",
        "primary-subtle": "#e1f0f5",
        "primary-subtle-hover": "#cbe5ee",
        "primary-subtle-active": "#c3e2ec",
        "primary-emphasis": "#3f6d7c",
        "primary-emphasis-hover": "#2f525d",
        "primary-border-subtle": "#c3e2ec",
        "text-on-primary": "#000000",

        "secondary": "#9141ac",
        "secondary-hover": "#7b3792",
        "secondary-active": "#74348a",
        "secondary-subtle": "#e9d9ee",
        "secondary-subtle-hover": "#d9bde2",
        "secondary-subtle-active": "#d3b3de",
        "secondary-emphasis": "#572767",
        "secondary-emphasis-hover": "#411d4d",
        "secondary-border-subtle": "#d3b3de",
        "text-on-secondary": "#ffffff",

        "tertiary": "#ffa348",
        "tertiary-hover": "#ffb163",
        "tertiary-active": "#ffb56d",
        "tertiary-subtle": "#ffedda",
        "tertiary-subtle-hover": "#ffdfbf",
        "tertiary-subtle-active": "#ffdab6",
        "tertiary-emphasis": "#99622b",
        "tertiary-emphasis-hover": "#734920",
        "tertiary-border-subtle": "#ffdab6",
        "text-on-tertiary": "#000000",
      },
      screens: {
        "xs": "360px",
        "s": "420px",
        ...defaultTheme.screens,
        "3xl": "1650px"
      }
    },
  },
  plugins: [],
}

