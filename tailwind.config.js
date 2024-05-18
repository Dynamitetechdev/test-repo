/** @type {import('tailwindcss').Config} */
import color from 'tailwindcss/colors'
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...color,
      primaryone: "#666B78",
      primarybg: "#272E40",
      poolGray: '#1B1F2F',
      dimGray: "#878A95",
      poolDarkBlue: "#0D101A",
      sharpGreen: "#00FFB0",
      blurGreen: "rgba(1, 255, 177, 0.26)",
      purple: "#19202E",
      textPrimary: "#6C6C7D",
      poolMobile: "rgba(27, 31, 47, 0.72)",
      lightBlue: "#D57FF2",
      borderColor: "#31394C"
    },
    screens: {
      md: "1200px",
      sm: "770px"
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    variants: {
      extend: {
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
        fontSize: ['responsive', 'hover'],
      },
    },
  },
  plugins: [],
}
