const sharp = require("sharp");
const fs = require("fs");

const inputFile = "./public/hakkimizda.png";
const outputWebP = "./public/hakkimizda_mobile.webp";
const outputPng = "./public/hakkimizda_mobile.png";

async function createMobileImages() {
	try {
		console.log("Creating optimized mobile images from desktop version...");

		// Create WebP version (best compression)
		await sharp(inputFile)
			.resize(800, null, {
				// 800px width for mobile, maintain aspect ratio
				fit: "inside",
				withoutEnlargement: true,
			})
			.webp({ quality: 85 })
			.toFile(outputWebP);

		// Create PNG fallback
		await sharp(inputFile)
			.resize(800, null, {
				fit: "inside",
				withoutEnlargement: true,
			})
			.png({
				quality: 90,
				compressionLevel: 9,
			})
			.toFile(outputPng);

		const originalSize = fs.statSync(inputFile).size;
		const webpSize = fs.statSync(outputWebP).size;
		const pngSize = fs.statSync(outputPng).size;

		console.log(`✅ Mobile images created!`);
		console.log(
			`Original desktop PNG: ${(originalSize / 1024 / 1024).toFixed(2)} MB`,
		);
		console.log(`Mobile WebP: ${(webpSize / 1024).toFixed(2)} KB`);
		console.log(`Mobile PNG: ${(pngSize / 1024).toFixed(2)} KB`);
		console.log(`\nRecommendation: Use the WebP version for best performance`);
	} catch (error) {
		console.error("Error creating mobile images:", error);
		process.exit(1);
	}
}

createMobileImages();
