"use client";

import type { FooterSection } from "@/lib/navigation-config";
import { FOOTER_POLICY_LINKS, FOOTER_SECTIONS } from "@/lib/navigation-config";
import Link from "next/link";
import { memo } from "react";

interface FooterProps {
	className?: string;
	showLogo?: boolean;
	copyrightText?: string;
}

const Footer = memo(function Footer({
	className = "",
	showLogo = true,
	copyrightText = "© 2025 Skycrops. Tüm hakları saklıdır.",
}: FooterProps) {
	const renderFooterSection = (section: FooterSection, _index: number) => (
		<div key={section.title} className="space-y-4">
			<h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">
				{section.title}
			</h3>
			<nav className="space-y-2" aria-label={`${section.title} menüsü`}>
				{section.links.map((link, linkIndex) => {
					const isExternal = link.external || link.href.startsWith("http");
					const isSpecialType = link.type === "email" || link.type === "tel";

					const linkProps = {
						href: link.href,
						className:
							"block text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:text-gray-800 focus:outline-none focus:underline",
						"aria-label": link.ariaLabel,
						...(isExternal &&
							!isSpecialType && {
								target: "_blank",
								rel: "noopener noreferrer",
							}),
					};

					const uniqueKey = `${section.title}-${link.href}-${linkIndex}`;

					if (section.title === "Adres") {
						return (
							<a key={uniqueKey} {...linkProps}>
								<div className="space-y-1">
									<div>Çorlu 1 OSB</div>
									<div>Bülent Ecevit Caddesi No:13/1</div>
									<div>PK: 59860 – Tekirdağ, Türkiye</div>
								</div>
							</a>
						);
					}

					return isExternal && !isSpecialType ? (
						<a key={uniqueKey} {...linkProps}>
							{link.label}
						</a>
					) : (
						<Link key={uniqueKey} {...linkProps}>
							{link.label}
						</Link>
					);
				})}
			</nav>
		</div>
	);

	return (
		<div
			className="relative h-[800px]"
			style={{
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			}}
		>
			<div className="relative h-[calc(100vh+800px)] -top-[100vh]">
				<div className="h-[800px] sticky top-[calc(100vh-800px)]">
					<footer
						className={`h-full bg-[#E7EBDE] py-8 px-6 border-t overflow-x-hidden ${className}`}
					>
						<div className="mx-12 h-full">
							{/* Footer Content Wrapper */}
							<div className="flex flex-col h-full space-y-8">
								{/* Navigation Sections */}
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
									{FOOTER_SECTIONS.map((section, index) =>
										renderFooterSection(section, index),
									)}
								</div>

								{/* Logo Section */}
								{showLogo && (
									<div className="flex items-center justify-center py-8 flex-grow">
										<Link
											href="/"
											aria-label="SkyCrops ana sayfasına git"
											className="block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E7EBDE] focus-visible:ring-gray-500/40"
										>
											<img
												src="/skycrops-logo.svg"
												alt="SkyCrops Logo"
												className="w-full max-w-md md:max-w-2xl h-auto"
											/>
										</Link>
									</div>
								)}

								{/* Copyright and policies section */}
								<div className="border-t pt-6 mt-auto">
									<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
										{/* Copyright */}
										<p className="text-sm text-gray-600">{copyrightText}</p>

										{/* Policy links */}
										<nav
											className="flex flex-wrap justify-center md:justify-end space-x-6"
											aria-label="Politika menüsü"
										>
											{FOOTER_POLICY_LINKS.map((link, index) => (
												<Link
													key={`${link.href}-${index}`}
													href={link.href}
													className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:text-gray-800 focus:outline-none focus:underline"
												>
													{link.label}
												</Link>
											))}
										</nav>
									</div>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
});

export default Footer;
