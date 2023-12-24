import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
         "light-1": "#FFFFFF",
         "success": '#14D81C',
         'warning': '#EA1919'
      },
      screens: {
      "2xl": { max: "1536px" },
      // => @media (max-width: 1536px) { ... }

      blogsSection: { max: '1340px' },
      // => @media (max-width: 1340px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      lg: { max: "1080px" },
      // => @media (max-width: 1080px) { ... }

      heroSection: { max: "900px" },
      // => @media (max-width: 1080px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      sm: { max: "640px" },
      // => @media (max-width: 640px) { ... }

      xs: { max: "500px" },
      // => @media (max-width: 5000px) { ... }

      "2xs": { max: "390px" },
      // => @media (max-width: 390px) { ... }
      },
    },
  },
  plugins: [],
}
export default config
