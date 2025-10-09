"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface NavigationContextType {
	isTransparent: boolean;
	setIsTransparent: (transparent: boolean) => void;
	isMobileSidebarOpen: boolean;
	setIsMobileSidebarOpen: (open: boolean) => void;
	headerBgColor: string;
	setHeaderBgColor: (color: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
	undefined,
);

export function NavigationProvider({ children }: { children: ReactNode }) {
	const [isTransparent, setIsTransparent] = useState(false);
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
	const [headerBgColor, setHeaderBgColor] = useState("#B2A79D");

	return (
		<NavigationContext.Provider
			value={{
				isTransparent,
				setIsTransparent,
				isMobileSidebarOpen,
				setIsMobileSidebarOpen,
				headerBgColor,
				setHeaderBgColor,
			}}
		>
			{children}
		</NavigationContext.Provider>
	);
}

export function useNavigation() {
	const context = useContext(NavigationContext);
	if (context === undefined) {
		throw new Error("useNavigation must be used within a NavigationProvider");
	}
	return context;
}
