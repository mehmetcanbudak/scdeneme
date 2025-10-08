import Image from "next/image";
import { memo } from "react";

interface LogoProps {
	className?: string;
	shouldBeTransparent?: boolean;
}

const Logo = memo(function Logo({
	className = "h-16 w-auto",
	shouldBeTransparent = false,
}: LogoProps) {
	//const logoSrc = shouldBeTransparent ? "/sclogo.svg" : "/sclogoblack.svg";
	const logoSrc = shouldBeTransparent ? "/sclogoblack.svg" : "/sclogo.svg";

	return (
		<div className="animate-logo-entrance mt-7">
			<Image
				src={logoSrc}
				alt="SkyCrops Logo"
				width={220}
				height={64}
				priority
				className={className}
			/>
		</div>
	);
});

export default Logo;
