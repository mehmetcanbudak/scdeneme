import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = "TRY"): string {
	const locale = currency === "TRY" ? "tr-TR" : "en-US";
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(price);
}
