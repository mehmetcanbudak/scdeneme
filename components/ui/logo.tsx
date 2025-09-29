import Image from "next/image";
import { memo } from "react";

interface LogoProps {
	className?: string;
	shouldBeTransparent?: boolean;
}

const Logo = memo(function Logo({
	className = "h-8 w-auto",
	shouldBeTransparent = false,
}: LogoProps) {
	//const logoSrc = shouldBeTransparent ? "/sclogo.svg" : "/sclogoblack.svg";
	const logoSrc = shouldBeTransparent ? "/sclogoblack.svg" : "/sclogo.svg";

	return (
		<Image
			src={logoSrc}
			alt="SkyCrops Logo"
			width={220}
			height={64}
			priority
			className={className}
		/>
	);
});

export default Logo;
