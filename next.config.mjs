import nextPWA from "next-pwa";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetManifest = [
	"/skycrops-logo.svg",
	"/skycrops.svg",
	"/skycrops-package-product.png",
	"/celenk.svg",
	"/farmımızda_yetisen_sebzeler/biz_skycrops.svg",
	"/skycrops-web.mp4",
	"/skycrops-compressed.mp4",
];

const withPWA = nextPWA({
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
	cacheOnFrontEndNav: true,
	dest: "public",
	additionalManifestEntries: assetManifest.map((url) => ({ url, revision: null })),
});

const nextConfig = withPWA({
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	outputFileTracingRoot: path.join(__dirname, "."),
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "dynamic-spirit-b1c4404b11.strapiapp.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "dynamic-spirit-b1c4404b11.media.strapiapp.com",
				pathname: "/**",
			},
		],
		qualities: [75, 85],
		formats: ["image/webp", "image/avif"],
	},
	env: {
		NEXT_PUBLIC_API_URL:
			process.env.NEXT_PUBLIC_API_URL ||
			"https://dynamic-spirit-b1c4404b11.strapiapp.com",
	},
	experimental: {
		scrollRestoration: true,
	},
});

export default nextConfig;
