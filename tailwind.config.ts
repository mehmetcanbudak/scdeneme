import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				nav: "1350px",
			},
			fontFamily: {
				sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
				montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
			},
			fontSize: {
				// Utility sizes
				xs: ["0.75rem", { lineHeight: "1.4" }], // 12px - caption, overline
				sm: ["0.875rem", { lineHeight: "1.5" }], // 14px - body-small, label
				base: ["1rem", { lineHeight: "1.5" }], // 16px - body, button
				lg: ["1.125rem", { lineHeight: "1.6" }], // 18px - body-large, h6
				xl: ["1.25rem", { lineHeight: "1.6" }], // 20px - body-xl, h5
				"2xl": ["1.5rem", { lineHeight: "1.35" }], // 24px - h4
				"3xl": ["1.875rem", { lineHeight: "1.3" }], // 30px - h3
				"4xl": ["2.25rem", { lineHeight: "1.25" }], // 36px - h2
				"5xl": ["3rem", { lineHeight: "1.2" }], // 48px - h1
				"6xl": ["3.75rem", { lineHeight: "1.15" }], // 60px - display-2
				"7xl": ["4.5rem", { lineHeight: "1.1" }], // 72px - display-1
				// Extended sizes
				"8xl": ["6rem", { lineHeight: "1" }], // 96px
				"9xl": ["8rem", { lineHeight: "1" }], // 128px
				// Responsive sizes for specific use
				"display-1": ["clamp(3rem, 8vw, 4.5rem)", { lineHeight: "1.1" }],
				"display-2": ["clamp(2.5rem, 6vw, 3.75rem)", { lineHeight: "1.15" }],
				h1: ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.2" }],
				h2: ["clamp(1.75rem, 4vw, 2.25rem)", { lineHeight: "1.25" }],
				h3: ["clamp(1.5rem, 3vw, 1.875rem)", { lineHeight: "1.3" }],
				h4: ["clamp(1.25rem, 2.5vw, 1.5rem)", { lineHeight: "1.35" }],
				h5: ["clamp(1.125rem, 2vw, 1.25rem)", { lineHeight: "1.4" }],
				h6: ["1.125rem", { lineHeight: "1.45" }],
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
