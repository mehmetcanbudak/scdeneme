import type React from "react";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";

/**
 * Props for HeroContent component
 */
interface HeroContentProps {
	onSubscribeClick: () => void;
	className?: string;
}

/**
 * Hero content section for subscription page
 * Displays main title and call-to-action
 *
 * @param {HeroContentProps} props - Component props
 * @returns {React.ReactElement} The hero content component
 */
const HeroContent: React.FC<HeroContentProps> = memo(
	({ onSubscribeClick, className = "" }) => {
		return (
			<div className={`text-center mb-16 ${className}`}>
				<h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide text-gray-800 leading-tight">
					Her Hafta Taptaze Yeşillikler
					<span className="block text-gray-600 font-medium">Kapınızda!</span>
				</h1>
				<p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
					Skycrops abonelik sistemiyle tanışın: Şehirde yaşarken en taze, en
					lezzetli ve en sağlıklı yeşilliklere zahmetsizce ulaşmanın en kolay
					yolu.
				</p>
				<div className="mt-8">
					<Button onClick={onSubscribeClick} className="px-10 py-4 text-lg">
						Hemen Abone Ol
					</Button>
				</div>
			</div>
		);
	},
);

HeroContent.displayName = "HeroContent";

export default HeroContent;
