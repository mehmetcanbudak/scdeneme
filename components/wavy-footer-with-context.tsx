"use client";

import { usePageBackground } from "@/contexts/page-background-context";
import WavyFooter from "./wavy-footer";

interface WavyFooterWithContextProps {
	className?: string;
}

export default function WavyFooterWithContext({
	className = "h-16",
}: WavyFooterWithContextProps) {
	const { backgroundColor } = usePageBackground();

	return <WavyFooter className={className} backgroundColor={backgroundColor} />;
}
