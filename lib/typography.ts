/**
 * Typography system constants for consistent text styling across the application
 * Based on industry best practices and design system standards
 */

export const TYPOGRAPHY = {
	// Heading styles with responsive sizing
	h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight",
	h2: "text-3xl md:text-4xl font-semibold tracking-tight leading-tight",
	h3: "text-2xl md:text-3xl font-semibold leading-snug",
	h4: "text-xl md:text-2xl font-medium leading-snug",
	h5: "text-lg md:text-xl font-medium leading-normal",
	h6: "text-base md:text-lg font-medium leading-normal",

	// Body text styles
	body: "text-base leading-relaxed",
	bodyLarge: "text-lg leading-relaxed",
	bodySmall: "text-sm leading-normal",

	// Display text (for hero sections, etc.)
	displayLarge: "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none",
	displayMedium: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight",
	displaySmall: "text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight",

	// Special purpose
	subtitle: "text-lg md:text-xl font-normal leading-relaxed",
	caption: "text-sm font-normal leading-normal",
	overline: "text-xs uppercase tracking-widest font-medium",

	// Button text
	button: "text-sm md:text-base font-medium tracking-wide uppercase",
	buttonSmall: "text-xs md:text-sm font-medium tracking-wide uppercase",

	// Link text
	link: "text-base font-medium hover:underline transition-colors",
} as const;

export const SPACING = {
	// Section spacing
	sectionPadding: "py-16 md:py-20 lg:py-24",
	sectionMargin: "mb-16 md:mb-20 lg:mb-24",

	// Content spacing
	contentGap: "space-y-6 md:space-y-8",
	headingMargin: "mb-4 md:mb-6",
	paragraphMargin: "mb-4",

	// Grid gaps
	gridGap: "gap-6 md:gap-8 lg:gap-12",
} as const;
