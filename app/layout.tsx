import Footer from "@/components/footer";
import Header from "@/components/header";
import InitialLoader from "@/components/initial-loader";
import { NavigationProvider } from "@/components/navigation-context";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { FooterColorProvider } from "@/contexts/footer-color-context";
import { ProductProvider } from "@/contexts/product-context";
import { SubscriptionProvider } from "@/contexts/subscription-context";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import ScrollToTop from "../components/scroll-to-top";
import "./globals.css";

export const metadata: Metadata = {
	title: "SkyCrops - Taze ve Yaşayan Sebzeler",
	description:
		"Skycrops ile taze, organik ve sağlıklı sebze paketlerine abone olun. Dikey tarım teknolojisi ile üretilen kaliteli sebzeler.",
	generator: "Next.js",
};

// Configure Google Fonts
const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-roboto",
});

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-poppins",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="tr" className="overflow-x-hidden" suppressHydrationWarning>
			<head>
				<script src="https://accounts.google.com/gsi/client" async></script>
				<link rel="preload" as="image" href="/skycrops-logo.svg" />
				<link rel="preload" as="image" href="/skycrops.svg" />
				<link rel="preload" as="image" href="/skycrops-package-product.png" />
				<link rel="preload" as="image" href="/celenk.svg" />
				<link
					rel="preload"
					as="image"
					href="/farmımızda_yetisen_sebzeler/biz_skycrops.svg"
				/>
				<link rel="preload" as="video" href="/skycrops-web.mp4" />
				<link rel="preload" as="video" href="/skycrops-compressed.mp4" />
			</head>
			<body
				className={`font-sans ${roboto.variable} ${poppins.variable} overflow-x-hidden`}
				suppressHydrationWarning
			>
				<InitialLoader />
				<AuthProvider>
					<ProductProvider>
						<CartProvider>
							<SubscriptionProvider>
								<FooterColorProvider>
									<NavigationProvider>
										<ScrollToTop />
										<Header />
										{children}
										<Footer />
									</NavigationProvider>
								</FooterColorProvider>
							</SubscriptionProvider>
						</CartProvider>
					</ProductProvider>
				</AuthProvider>
				<Analytics />
			</body>
		</html>
	);
}
