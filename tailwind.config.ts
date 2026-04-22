import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: {
          DEFAULT: "#1F0D04", // Castanho muito escuro principal
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#120602", // Castanho quase preto
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5EDE6",
          foreground: "#3A1B06",
        },
        accent: {
          DEFAULT: "#D6C1A6", // Beige para detalhes
          foreground: "#231008",
        },
        gold: {
          DEFAULT: "#3A1B06",
          light: "#F5EDE6",
          bright: "#6B3E1E",
          dark: "#231008",
        },
        beige: {
          light: "#E8DCC6",
          DEFAULT: "#D6C1A6",
          dark: "#C4B08F",
          foreground: "#231008",
        },
        brown: {
          primary: "#3A1B06",
          dark: "#231008",
          light: "#6B3E1E",
          muted: "#F5EDE6",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        'gradient-brown': 'linear-gradient(90deg, #231008, #3A1B06, #6B3E1E)',
        'gradient-brown-reverse': 'linear-gradient(270deg, #231008, #3A1B06, #6B3E1E)',
        'gradient-brown-radial': 'radial-gradient(circle, #231008, #3A1B06, #6B3E1E)',
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
