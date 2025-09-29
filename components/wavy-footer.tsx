import { memo } from "react";

interface WavyFooterProps {
	className?: string;
}

const WavyFooter = memo(function WavyFooter({
	className = "",
}: WavyFooterProps) {
	return (
		<div className={`relative w-full overflow-hidden ${className}`}>
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
					fill="#A7C7E7"
					opacity="0.8"
				/>
				<path
					d="M0,48 C360,80 720,16 1440,48 L1440,120 L0,120 Z"
					fill="#B8D4F0"
					opacity="0.6"
				/>
				<path
					d="M0,32 C360,64 720,0 1440,32 L1440,120 L0,120 Z"
					fill="#C9E1F9"
					opacity="0.4"
				/>
			</svg>
		</div>
	);
});

export default WavyFooter;
