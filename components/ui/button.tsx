"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

const variantStyles = {
	primary:
		"border-[#010101] bg-[#fdcd62] text-[#010101] hover:bg-[#fdcd62] focus-visible:bg-[#fdcd62]",
	primaryInverse:
		"border-white bg-white text-[#010101] hover:bg-white focus-visible:bg-white",
	inverseOutline:
		"border-white bg-transparent text-white hover:bg-white hover:text-[#010101] focus-visible:bg-white focus-visible:text-[#010101]",
	primaryActive:
		"border-[#010101] bg-[#f5c2c1] text-[#010101] hover:bg-[#f5c2c1] focus-visible:bg-[#f5c2c1]",
	dark: "border-[#010101] bg-[#010101] text-white hover:bg-[#010101] focus-visible:bg-[#010101]",
	outline:
		"border-[#010101] bg-transparent text-[#010101] hover:bg-[#fdcd62] focus-visible:bg-[#fdcd62]",
	ghost:
		"border-transparent bg-transparent text-[#010101] hover:bg-[#fdcd62]/40 focus-visible:bg-[#fdcd62]/40",
	link: "border-transparent bg-transparent underline-offset-4 hover:underline",
} as const;

const sizeStyles = {
	sm: "min-h-[40px] px-4 text-sm",
	default: "min-h-[46px] px-6 text-base",
	lg: "min-h-[52px] px-8 text-lg",
	icon: "min-h-[46px] px-0 aspect-square text-base",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		React.AnchorHTMLAttributes<HTMLAnchorElement> {
	asChild?: boolean;
	variant?: ButtonVariant;
	size?: ButtonSize;
}

const coreClasses =
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[70px] border font-semibold shadow-none transition-[box-shadow,transform,background-color,color,border-color] duration-200 ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#010101] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const offsetClasses =
	"hover:translate-x-[5px] hover:-translate-y-[5px] hover:shadow-[-5px_5px_0_0_#010101] focus-visible:translate-x-[5px] focus-visible:-translate-y-[5px] focus-visible:shadow-[-5px_5px_0_0_#010101]";

const offsetDisabledClasses =
	"hover:translate-x-0 hover:-translate-y-0 hover:shadow-none focus-visible:translate-x-0 focus-visible:-translate-y-0 focus-visible:shadow-none";

interface ButtonVariantsInput {
	variant?: ButtonVariant;
	size?: ButtonSize;
	offset?: boolean;
	className?: string;
}

const buttonVariants = ({
	variant = "primary",
	size = "default",
	offset = true,
	className,
}: ButtonVariantsInput = {}) =>
	cn(
		coreClasses,
		offset ? offsetClasses : offsetDisabledClasses,
		sizeStyles[size],
		variantStyles[variant],
		className,
	);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			asChild = false,
			variant = "primary",
			size = "default",
			className,
			offset = true,
			type,
			children,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
				className={buttonVariants({ variant, size, offset, className })}
				type={!asChild ? (type ?? "button") : undefined}
				{...props}
			>
				{children}
			</Comp>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonVariants };
