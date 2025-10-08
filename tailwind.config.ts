import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-roboto)", "system-ui", "sans-serif"],
				roboto: ["var(--font-roboto)", "system-ui", "sans-serif"],
				poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
			},
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1rem" }],
				sm: ["0.875rem", { lineHeight: "1.25rem" }],
				base: ["1rem", { lineHeight: "1.625rem" }],
				lg: ["1.125rem", { lineHeight: "1.75rem" }],
				xl: ["1.25rem", { lineHeight: "1.875rem" }],
				"2xl": ["1.5rem", { lineHeight: "2rem" }],
				"3xl": ["1.875rem", { lineHeight: "2.375rem" }],
				"4xl": ["2.25rem", { lineHeight: "2.75rem" }],
				"5xl": ["3rem", { lineHeight: "1.2" }],
				"6xl": ["3.75rem", { lineHeight: "1.2" }],
				"7xl": ["4.5rem", { lineHeight: "1" }],
			},
			lineHeight: {
				none: "1",
				tight: "1.25",
				snug: "1.375",
				normal: "1.5",
				relaxed: "1.625",
				loose: "2",
			},
			letterSpacing: {
				tighter: "-0.05em",
				tight: "-0.025em",
				normal: "0",
				wide: "0.025em",
				wider: "0.05em",
				widest: "0.1em",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				product: "20px 10px 10px 20px",
				"product-sm": "10px",
			},
			animation: {
				scroll: "scroll 20s linear infinite",
				"fade-in": "fadeIn 0.3s ease-out",
				"slide-in-from-left": "slideInFromLeft 0.3s ease-out",
				"logo-entrance": "logoEntrance 1.2s ease-out",
				"logo-loading": "logoLoading 1.5s ease-in-out infinite",
			},
			keyframes: {
				scroll: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideInFromLeft: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
				logoEntrance: {
					"0%": { opacity: "0", transform: "translateY(20px) scale(0.95)" },
					"100%": { opacity: "1", transform: "translateY(0) scale(1)" },
				},
				logoLoading: {
					"0%, 100%": { opacity: "1", transform: "scale(1)" },
					"50%": { opacity: "0.7", transform: "scale(0.98)" },
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
