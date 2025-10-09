/**
 * LanguageSelector Component
 * Dropdown for selecting application language
 * Part of the right section in navbar
 */

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { memo, useState } from "react";
import type { Language, LanguageSelectorProps } from "./navbar.types";

const LANGUAGES: Language[] = [
	{ code: "tr", name: "Türkçe", flag: "🇹🇷" },
	{ code: "en", name: "English", flag: "🇬🇧" },
];

const LanguageSelector = memo(function LanguageSelector({
	shouldBeTransparent,
	className = "",
}: LanguageSelectorProps) {
	const [currentLanguage, setCurrentLanguage] = useState<Language>(
		LANGUAGES[0],
	);
	const pathname = usePathname();

	const handleLanguageChange = (language: Language) => {
		setCurrentLanguage(language);
		// TODO: Implement actual language switching logic
		// This could involve i18n library or Next.js internationalization
		console.log("Language changed to:", language.code);
	};

	// Determine icon color based on page and transparency
	const isHomePage = pathname === "/";
	const iconColor =
		isHomePage && !shouldBeTransparent ? "text-black" : "text-white";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className={`group flex items-center gap-2 h-6 px-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/60 transition-colors hover:opacity-80 ${className}`}
					aria-label="Dil seç"
				>
					<span className="text-base" aria-hidden="true">
						{currentLanguage.flag}
					</span>
					<Globe
						className={`w-4 h-4 transition-colors ${iconColor}`}
						aria-hidden="true"
					/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[150px]">
				{LANGUAGES.map((language) => (
					<DropdownMenuItem
						key={language.code}
						onClick={() => handleLanguageChange(language)}
						className={`flex items-center gap-3 cursor-pointer ${
							currentLanguage.code === language.code ? "bg-accent" : ""
						}`}
					>
						<span className="text-base" aria-hidden="true">
							{language.flag}
						</span>
						<span className="text-sm">{language.name}</span>
						{currentLanguage.code === language.code && (
							<span className="ml-auto text-xs" aria-label="Seçili">
								✓
							</span>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
});

export default LanguageSelector;
