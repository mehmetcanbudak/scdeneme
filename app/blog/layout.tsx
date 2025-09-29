import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog | Skycrops",
	description:
		"Ekibimizce yazılan makaleler, tarım ve sağlıklı yaşam üzerine içerikler.",
	keywords: [
		"tarım blog",
		"dikey tarım",
		"sağlıklı beslenme",
		"tarım teknolojileri",
		"skycrops",
		"hidroponik",
		"organik tarım",
	].join(", "),
	openGraph: {
		title: "Skycrops Blog",
		description:
			"Ekibimizce yazılan makaleler, tarım ve sağlıklı yaşam üzerine içerikler.",
		type: "website",
		url: "/blog",
		locale: "tr_TR",
		siteName: "Skycrops",
	},
	twitter: {
		card: "summary_large_image",
		title: "Skycrops Blog",
		description:
			"Ekibimizce yazılan makaleler, tarım ve sağlıklı yaşam üzerine içerikler.",
	},
	alternates: {
		canonical: "/blog",
	},
};

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
