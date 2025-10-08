const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFile = "./public/hakkimizda_mobile.svg";
const outputFile = "./public/hakkimizda_mobile.webp";

async function optimizeSVG() {
	try {
		console.log("Converting SVG to WebP...");

		// Convert SVG to WebP with appropriate width for mobile
		await sharp(inputFile)
			.resize(800, null, {
				// 800px width, auto height
				fit: "inside",
				withoutEnlargement: true,
			})
			.webp({ quality: 85 }) // High quality WebP
			.toFile(outputFile);

		const originalSize = fs.statSync(inputFile).size;
		const optimizedSize = fs.statSync(outputFile).size;

		console.log(`✅ Conversion complete!`);
		console.log(`Original SVG: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
		console.log(`Optimized WebP: ${(optimizedSize / 1024).toFixed(2)} KB`);
		console.log(
			`Saved: ${(((originalSize - optimizedSize) / originalSize) * 100).toFixed(1)}%`,
		);

		// Also create a PNG fallback if needed
		const pngOutput = "./public/hakkimizda_mobile.png";
		await sharp(inputFile)
			.resize(800, null, {
				fit: "inside",
				withoutEnlargement: true,
			})
			.png({ quality: 90 })
			.toFile(pngOutput);

		const pngSize = fs.statSync(pngOutput).size;
		console.log(`PNG fallback: ${(pngSize / 1024).toFixed(2)} KB`);
	} catch (error) {
		console.error("Error converting image:", error);
		process.exit(1);
	}
}

optimizeSVG();
