import { memo } from "react";

interface WavyFooterProps {
	className?: string;
	backgroundColor?: string;
}

const WavyFooter = memo(function WavyFooter({
	className = "",
	backgroundColor = "#AD3911",
}: WavyFooterProps) {
	// Generate lighter shades of the background color
	const getLighterShades = (_color: string) => {
		// For now, we'll create variations by adjusting opacity
		// This is a simple approach - you could use a more sophisticated color manipulation library
		return [{ opacity: 0.8 }, { opacity: 0.6 }, { opacity: 0.4 }];
	};

	const shades = getLighterShades(backgroundColor);

	return (
		<div className={`relative w-full ${className}`}>
			<svg
				className="relative w-full h-full"
				viewBox="0 0 1440 120"
				preserveAspectRatio="none"
				xmlns="http://www.w3.org/2000/svg"
				role="img"
				aria-label="Decorative wavy transition to footer"
			>
				<path
					d="M0,64 C360,96 720,32 1440,64 L1440,120 L0,120 Z"
					fill={backgroundColor}
					opacity={shades[0].opacity}
				/>
				<path
					d="M0,48 C360,80 720,16 1440,48 L1440,120 L0,120 Z"
					fill={backgroundColor}
					opacity={shades[1].opacity}
				/>
				<path
					d="M0,32 C360,64 720,0 1440,32 L1440,120 L0,120 Z"
					fill={backgroundColor}
					opacity={shades[2].opacity}
				/>
			</svg>
		</div>
	);
});

export default WavyFooter;
