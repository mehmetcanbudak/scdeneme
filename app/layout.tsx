import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import InitialLoader from "@/components/initial-loader";
import { NavigationProvider } from "@/components/navigation-context";
import DebugPanel from "@/components/debug/debug-panel";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { FooterColorProvider } from "@/contexts/footer-color-context";
import { ProductProvider } from "@/contexts/product-context";
import { SubscriptionProvider } from "@/contexts/subscription-context";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ScrollToTop from "../components/scroll-to-top";
import "./globals.css";

export const metadata: Metadata = {
	title: "SkyCrops - Taze ve Yaşayan Sebzeler",
	description:
		"Skycrops ile taze, organik ve sağlıklı sebze paketlerine abone olun. Dikey tarım teknolojisi ile üretilen kaliteli sebzeler.",
	generator: "Next.js",
};

// Configure Montserrat font with multiple weights for typography system
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	variable: "--font-montserrat",
	display: "swap",
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
				{/* Preconnect to external domains for faster loading */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="preconnect"
					href="https://dynamic-spirit-b1c4404b11.strapiapp.com"
				/>
				<link
					rel="dns-prefetch"
					href="https://dynamic-spirit-b1c4404b11.media.strapiapp.com"
				/>

				{/* Preload critical above-the-fold images only */}
				<link
					rel="preload"
					as="image"
					href="/skycrops-logo.svg"
					fetchPriority="high"
				/>
				<link
					rel="preload"
					as="image"
					href="/skycrops.svg"
					fetchPriority="high"
				/>
				<link
					rel="preload"
					as="image"
					href="/skycrops-package-product.png"
					fetchPriority="high"
				/>
				<link rel="preload" as="image" href="/celenk.svg" />
				<link
					rel="preload"
					as="image"
					href="/farmımızda_yetisen_sebzeler/biz_skycrops.svg"
				/>
				{/* Removed video preloads as they're heavy and not critical for initial load */}
			</head>
			<body
				className={`${montserrat.variable} font-sans overflow-x-hidden`}
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
										<Navbar />
										{children}
										<Footer />
										<DebugPanel />
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
