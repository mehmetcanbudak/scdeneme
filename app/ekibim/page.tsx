"use client";

import React, { useCallback, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useNavigationTransparency } from "@/hooks/use-navigation-transparency";

/**
 * Team member data interface
 */
interface TeamMember {
	name: string;
	role: string;
	image: string;
	description: string;
}

/**
 * TeamMemberCard component - Displays a team member with their info
 */
const TeamMemberCard = React.memo<{ member: TeamMember }>(({ member }) => {
	return (
		<div className="text-center">
			<div className="relative mb-6 overflow-hidden rounded-lg w-full h-48 mx-auto">
				<Image
					src={member.image || "/placeholder.svg"}
					alt={member.name}
					width={300}
					height={192}
					className="object-cover"
				/>
			</div>
			<h3 className="text-xl font-medium mb-2">{member.name}</h3>
			<p className="text-black font-medium mb-4">{member.role}</p>
			<p className="text-black text-sm">{member.description}</p>
		</div>
	);
});
TeamMemberCard.displayName = "TeamMemberCard";

/**
 * Ekibim page component - Team page
 */
export default function Ekibim() {
	// Enable transparent navigation for hero section
	useNavigationTransparency(true);

	/**
	 * Scrolls smoothly to the main content section
	 */
	const scrollToContent = useCallback(() => {
		const contentSection = document.querySelector("#main-content");
		if (contentSection) {
			const headerHeight = 64;
			const elementPosition =
				contentSection.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	}, []);

	/**
	 * Team members data array
	 */
	const teamMembers = useMemo<TeamMember[]>(
		() => [
			{
				name: "Ahmet Yılmaz",
				role: "Baş Agronom",
				image: "/fresh-vegetables-and-greens-in-modern-greenhouse.png",
				description: "15 yıllık deneyimi ile organik tarım konusunda uzman",
			},
			{
				name: "Fatma Demir",
				role: "Sera Yöneticisi",
				image: "/organic-farming-greenhouse-vegetables.png",
				description:
					"Modern sera teknolojileri ve sürdürülebilir üretim uzmanı",
			},
			{
				name: "Mehmet Kaya",
				role: "Kalite Kontrol",
				image: "/fresh-leafy-greens-and-herbs-in-baskets.png",
				description: "Ürün kalitesi ve güvenliği konusunda sertifikalı uzman",
			},
		],
		[],
	);

	return (
		<div className="min-h-screen bg-white relative">
			{/* Navigation is now handled by the shared Navigation component */}

			{/* Hero section with first slide image */}
			<section className="relative h-[52.5vh] overflow-visible z-10">
				<div className="absolute inset-0">
					<Image
						src="/agricultural-figures-with-plants-and-sun.png"
						alt="Ekibimiz"
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-black/40"></div>
				</div>

				<div className="relative z-10 h-full flex items-center justify-center text-center text-white">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="mb-8">
							<h1 className="text-5xl md:text-7xl font-light mb-8 tracking-wide text-black">
								EKİBİMİZ
							</h1>
						</div>
					</div>
				</div>
			</section>

			{/* Scroll down arrow button */}
			<div className="relative z-[999] -mt-4">
				<div className="flex justify-center">
					<button
						onClick={scrollToContent}
						className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300"
					>
						<ChevronDown className="w-5 h-5 text-black" />
					</button>
				</div>
			</div>

			{/* Main content with id and bg-white */}
			<main
				id="main-content"
				className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-white"
			>
				<div className="mx-auto max-w-7xl">
					{/* Page Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-black">
							Ekibimiz
						</h1>
						<p className="text-lg text-black">
							Deneyimli ve tutkulu tarım uzmanları
						</p>
					</div>

					{/* Team Members */}
					<div className="bg-white p-8 rounded-lg shadow-sm">
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
							{teamMembers.map((member, index) => (
								<TeamMemberCard key={index} member={member} />
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
