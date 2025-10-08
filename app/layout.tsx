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
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import ScrollToTop from "../components/scroll-to-top";
import "./globals.css";

export const metadata: Metadata = {
	title: "SkyCrops - Taze ve Yaşayan Sebzeler",
	description:
		"Skycrops ile taze, organik ve sağlıklı sebze paketlerine abone olun. Dikey tarım teknolojisi ile üretilen kaliteli sebzeler.",
	generator: "Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="tr" className="overflow-x-hidden" suppressHydrationWarning>
			<head>
				<script src="https://accounts.google.com/gsi/client" async></script>
			</head>
			<body
				className={`font-sans ${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden`}
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
