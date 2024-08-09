import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}"

  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 70px -15px ', // Custom shadow value
      },
        
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        Abril: ['var(--font-Abril)'],
        inter: ['var(--font-inter)'],
      },
      fontSize:{
        "header":"7rem",
        "homeHeader":"4rem",
        "semiHeader":"3rem",
        "small":"0.5rem"
      },
      lineHeight:{
        "small":"0.5rem"
      },

      screens: {
        'mid': { 'max': '1100px' }, // Custom breakpoint for max-width 480px
        'xxs':{ 'max': '752px'},
        'halfmd':{ 'max': '900' }, 
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
  
        colors: {
          Main: '#FAF0E6',
          tooHardBeige:"#D0A175",
          hardBeige:"#D38B47",
          softBeige:"#FAF0E6",
          semiHardBeige:"#CFBDAC",
          Beige:"#E4D5B7",
          softGray:"#F4F4F4",
          brown:"#5E2F00"
        },
    },
  },
  plugins: [],
};
export default config;
