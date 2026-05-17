/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        fg: "#f5f0e8",
        muted: "#6a7a92",
        accent: "#c89858",
        accent2: "#e7d8b8",
        border: "rgba(245,240,232,0.12)",
        overlay: "rgba(10,10,10,0.85)",
        matue: "#1f6bff",
        wiu: "#c8506a",
        teto: "#c89858",
        brandao: "#ff3b1f",
      },
      fontFamily: {
        cinzel: ["Cinzel-500"],
        cinzelBold: ["Cinzel-700"],
        inter: ["Inter-400"],
        interSemi: ["Inter-600"],
        bebas: ["BebasNeue-400"],
        marker: ["PermanentMarker-400"],
        gothic: ["UnifrakturCook-700"],
        caveat: ["Caveat-700"],
        space: ["SpaceGrotesk-500"],
        cormorant: ["CormorantGaramond-500-Italic"],
        archivo: ["Archivo-700"],
        anton: ["Anton-400"],
      },
    },
  },
  plugins: [],
};
