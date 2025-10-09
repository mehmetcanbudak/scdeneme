/**
 * Typography System Configuration
 * Centralized configuration for all typography variants across the application
 * Based on Montserrat font family with a modular scale
 */

export const typographyConfig = {
	// Display variants - for hero sections and large marketing text
	display: {
		"display-1": {
			fontSize: "clamp(3rem, 8vw, 4.5rem)", // 48px - 72px
			lineHeight: "1.1",
			letterSpacing: "-0.02em",
			fontWeight: "800",
		},
		"display-2": {
			fontSize: "clamp(2.5rem, 6vw, 3.75rem)", // 40px - 60px
			lineHeight: "1.15",
			letterSpacing: "-0.015em",
			fontWeight: "700",
		},
	},

	// Heading variants - for section titles and page structure
	headings: {
		h1: {
			fontSize: "clamp(2rem, 5vw, 3rem)", // 32px - 48px
			lineHeight: "1.2",
			letterSpacing: "-0.02em",
			fontWeight: "700",
		},
		h2: {
			fontSize: "clamp(1.75rem, 4vw, 2.25rem)", // 28px - 36px
			lineHeight: "1.25",
			letterSpacing: "-0.01em",
			fontWeight: "700",
		},
		h3: {
			fontSize: "clamp(1.5rem, 3vw, 1.875rem)", // 24px - 30px
			lineHeight: "1.3",
			letterSpacing: "normal",
			fontWeight: "600",
		},
		h4: {
			fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", // 20px - 24px
			lineHeight: "1.35",
			letterSpacing: "normal",
			fontWeight: "600",
		},
		h5: {
			fontSize: "clamp(1.125rem, 2vw, 1.25rem)", // 18px - 20px
			lineHeight: "1.4",
			letterSpacing: "normal",
			fontWeight: "600",
		},
		h6: {
			fontSize: "1.125rem", // 18px
			lineHeight: "1.45",
			letterSpacing: "normal",
			fontWeight: "600",
		},
	},

	// Body text variants - for paragraphs and content
	body: {
		"body-xl": {
			fontSize: "1.25rem", // 20px
			lineHeight: "1.6",
			letterSpacing: "normal",
			fontWeight: "400",
		},
		"body-lg": {
			fontSize: "1.125rem", // 18px
			lineHeight: "1.6",
			letterSpacing: "normal",
			fontWeight: "400",
		},
		body: {
			fontSize: "1rem", // 16px
			lineHeight: "1.5",
			letterSpacing: "normal",
			fontWeight: "400",
		},
		"body-sm": {
			fontSize: "0.875rem", // 14px
			lineHeight: "1.5",
			letterSpacing: "normal",
			fontWeight: "400",
		},
	},

	// UI elements - for buttons, labels, and interface text
	ui: {
		button: {
			fontSize: "1rem", // 16px
			lineHeight: "1",
			letterSpacing: "0.025em",
			fontWeight: "600",
		},
		"button-sm": {
			fontSize: "0.875rem", // 14px
			lineHeight: "1",
			letterSpacing: "0.025em",
			fontWeight: "600",
		},
		"button-lg": {
			fontSize: "1.125rem", // 18px
			lineHeight: "1",
			letterSpacing: "0.025em",
			fontWeight: "600",
		},
		label: {
			fontSize: "0.875rem", // 14px
			lineHeight: "1.4",
			letterSpacing: "normal",
			fontWeight: "500",
		},
		caption: {
			fontSize: "0.75rem", // 12px
			lineHeight: "1.4",
			letterSpacing: "normal",
			fontWeight: "400",
		},
		overline: {
			fontSize: "0.75rem", // 12px
			lineHeight: "1",
			letterSpacing: "0.1em",
			fontWeight: "600",
			textTransform: "uppercase" as const,
		},
	},

	// Link variants
	links: {
		link: {
			fontSize: "inherit",
			lineHeight: "inherit",
			letterSpacing: "inherit",
			fontWeight: "500",
			textDecoration: "underline",
			textUnderlineOffset: "2px",
		},
		"link-subtle": {
			fontSize: "inherit",
			lineHeight: "inherit",
			letterSpacing: "inherit",
			fontWeight: "inherit",
			textDecoration: "none",
		},
	},
} as const;

// Type exports for TypeScript
export type DisplayVariant = keyof typeof typographyConfig.display;
export type HeadingVariant = keyof typeof typographyConfig.headings;
export type BodyVariant = keyof typeof typographyConfig.body;
export type UIVariant = keyof typeof typographyConfig.ui;
export type LinkVariant = keyof typeof typographyConfig.links;

export type TypographyVariant =
	| DisplayVariant
	| HeadingVariant
	| BodyVariant
	| UIVariant
	| LinkVariant;
