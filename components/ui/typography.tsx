/**
 * Typography Component
 * Provides consistent typography styles across the application
 * Supports all heading variants (h1-h6), display text, and semantic HTML elements
 */

import { cn } from "@/lib/utils";
import type React from "react";
import {
	type ComponentPropsWithoutRef,
	type ElementType,
	forwardRef,
} from "react";

// Typography variant to HTML element mapping
const variantElementMap = {
	"display-1": "h1",
	"display-2": "h1",
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
} as const;

// Typography variant CSS classes
const variantClasses = {
	"display-1": "text-display-1 font-extrabold tracking-tight",
	"display-2": "text-display-2 font-bold tracking-tight",
	h1: "text-h1 font-bold tracking-tight",
	h2: "text-h2 font-bold tracking-tight",
	h3: "text-h3 font-semibold",
	h4: "text-h4 font-semibold",
	h5: "text-h5 font-semibold",
	h6: "text-h6 font-semibold",
} as const;

export type TypographyVariant = keyof typeof variantClasses;

export interface TypographyProps<T extends ElementType = ElementType> {
	/** Typography variant determines size, weight, and spacing */
	variant?: TypographyVariant;
	/** Custom element type to render (defaults to semantic element for variant) */
	as?: T;
	/** Additional CSS classes */
	className?: string;
	/** Children content */
	children: React.ReactNode;
}

/**
 * Typography component for headings and display text
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Main Heading</Typography>
 * <Typography variant="display-1" as="div">Hero Title</Typography>
 * <Typography variant="h3" className="text-red-500">Custom Color</Typography>
 * ```
 */
const Typography = forwardRef<
	HTMLElement,
	TypographyProps<any> &
		Omit<ComponentPropsWithoutRef<any>, keyof TypographyProps<any>>
>(({ variant = "h1", as, className, children, ...props }, ref) => {
	// Determine the component to render
const Component = (as || variantElementMap[variant as TypographyVariant] || "h1") as ElementType;

	return (
		<Component
			ref={ref}
className={cn(variantClasses[variant as TypographyVariant], className)}
			{...props}
		>
			{children}
		</Component>
	);
});

Typography.displayName = "Typography";

export { Typography };
