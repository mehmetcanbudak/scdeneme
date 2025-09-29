import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { NavigationProvider } from "@/components/navigation-context";
import WavyFooter from "@/components/wavy-footer";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
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
		<html lang="tr" className="overflow-x-hidden">
			<body
				className={`font-sans ${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden`}
			>
				<AuthProvider>
					<ProductProvider>
						<CartProvider>
							<SubscriptionProvider>
								<NavigationProvider>
									<ScrollToTop />
									<Navigation />
									{children}
									<WavyFooter className="h-16" />
									<Footer />
								</NavigationProvider>
							</SubscriptionProvider>
						</CartProvider>
					</ProductProvider>
				</AuthProvider>
				<Analytics />
			</body>
		</html>
	);
}
