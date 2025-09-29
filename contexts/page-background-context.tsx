"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface PageBackgroundContextType {
	backgroundColor: string;
	setBackgroundColor: (color: string) => void;
}

const PageBackgroundContext = createContext<
	PageBackgroundContextType | undefined
>(undefined);

export function PageBackgroundProvider({ children }: { children: ReactNode }) {
	const [backgroundColor, setBackgroundColor] = useState<string>("#E7EBDE"); // Default color

	return (
		<PageBackgroundContext.Provider
			value={{ backgroundColor, setBackgroundColor }}
		>
			{children}
		</PageBackgroundContext.Provider>
	);
}

export function usePageBackground() {
	const context = useContext(PageBackgroundContext);
	if (context === undefined) {
		throw new Error(
			"usePageBackground must be used within a PageBackgroundProvider",
		);
	}
	return context;
}
