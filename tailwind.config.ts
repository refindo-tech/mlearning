import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
// const {nextui} = require("@nextui-org/react");
const config:Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primer:{
          100:'#DED8FC',
          200:'#9789F0',
          300:'#4C3BCF',
          400:'#281D95',
          500:'#110B63'
        },
        sekunder:{
          100:'#FEF9CC',
          200:'#FBE768',
          300:'#F2CB07',
          400:'#AE8C03',
          500:'#745901'
        },
        accent:{
          "orange":'#FA8500',
          "green":'#39AD27',
          "red":'#F22424'
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;
