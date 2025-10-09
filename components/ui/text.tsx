/**
 * Text Component
 * Provides consistent text styles for body content, labels, captions, and UI elements
 */

import { cn } from "@/lib/utils";
import type React from "react";
import {
	type ComponentPropsWithoutRef,
	type ElementType,
	forwardRef,
} from "react";

// Text variant CSS classes
const variantClasses = {
	// Body text variants
	"body-xl": "text-xl font-normal leading-relaxed",
	"body-lg": "text-lg font-normal leading-relaxed",
	body: "text-base font-normal leading-normal",
	"body-sm": "text-sm font-normal leading-normal",

	// UI text variants
	label: "text-sm font-medium leading-snug",
	caption: "text-xs font-normal leading-snug",
	overline: "text-xs font-semibold uppercase tracking-widest leading-none",

	// Link variants
	link: "text-base font-medium underline underline-offset-2 hover:opacity-80 transition-opacity",
	"link-sm":
		"text-sm font-medium underline underline-offset-2 hover:opacity-80 transition-opacity",
	"link-subtle": "text-base font-normal hover:underline transition-all",
} as const;

// Default element mapping
const variantElementMap: Record<TextVariant, string> = {
	"body-xl": "p",
	"body-lg": "p",
	body: "p",
	"body-sm": "p",
	label: "label",
	caption: "span",
	overline: "span",
	link: "a",
	"link-sm": "a",
	"link-subtle": "a",
} as const;

export type TextVariant = keyof typeof variantClasses;

export interface TextProps<T extends ElementType = ElementType> {
	/** Text variant determines size, weight, and spacing */
	variant?: TextVariant;
	/** Custom element type to render */
	as?: T;
	/** Additional CSS classes */
	className?: string;
	/** Children content */
	children: React.ReactNode;
}

/**
 * Text component for body content and UI text
 *
 * @example
 * ```tsx
 * <Text variant="body-lg">Large body text</Text>
 * <Text variant="label">Form Label</Text>
 * <Text variant="caption">Small caption text</Text>
 * <Text variant="link" as="a" href="/about">Link Text</Text>
 * ```
 */
const Text = forwardRef<
	HTMLElement,
	TextProps<any> & Omit<ComponentPropsWithoutRef<any>, keyof TextProps<any>>
>(({ variant = "body", as, className, children, ...props }, ref) => {
	// Determine the component to render
const Component = (as || variantElementMap[variant as TextVariant] || "p") as ElementType;

	return (
		<Component
			ref={ref}
className={cn(variantClasses[variant as TextVariant], className)}
			{...props}
		>
			{children}
		</Component>
	);
});

Text.displayName = "Text";

export { Text };
