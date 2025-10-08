/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: [
			"localhost",
			"dynamic-spirit-b1c4404b11.strapiapp.com",
			"dynamic-spirit-b1c4404b11.media.strapiapp.com"
		],
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
};

export default nextConfig;
