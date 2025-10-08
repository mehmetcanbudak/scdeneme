"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface FooterColorContextType {
	footerColor: string;
	setFooterColor: (color: string) => void;
}

const FooterColorContext = createContext<FooterColorContextType | undefined>(
	undefined,
);

export function FooterColorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [footerColor, setFooterColorState] = useState("#E7EBDE");

	const setFooterColor = useCallback((color: string) => {
		setFooterColorState(color);
	}, []);

	return (
		<FooterColorContext.Provider value={{ footerColor, setFooterColor }}>
			{children}
		</FooterColorContext.Provider>
	);
}

export function useFooterColor() {
	const context = useContext(FooterColorContext);
	if (context === undefined) {
		throw new Error("useFooterColor must be used within a FooterColorProvider");
	}
	return context;
}
