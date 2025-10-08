const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// List of large images to compress
const imagesToCompress = [
	{
		input: "public/urunler.png",
		output: "public/urunler-compressed.png",
		maxSize: 500,
	},
	{
		input: "public/tohumlar.png",
		output: "public/tohumlar-compressed.png",
		maxSize: 500,
	},
	{
		input: "public/hakkimizda.png",
		output: "public/hakkimizda-compressed.png",
		maxSize: 500,
	},
	{
		input: "public/tesisler.png",
		output: "public/tesisler-compressed.png",
		maxSize: 400,
	},
	{
		input: "public/anasayfa.png",
		output: "public/anasayfa-compressed.png",
		maxSize: 300,
	},
];

async function compressImage(inputPath, outputPath, maxSizeKB) {
	try {
		console.log(`Compressing ${inputPath}...`);

		// Get original file size
		const originalStats = fs.statSync(inputPath);
		const originalSizeKB = Math.round(originalStats.size / 1024);
		console.log(`Original size: ${originalSizeKB}KB`);

		// Start with high quality and reduce if needed
		let quality = 90;
		let outputBuffer;

		do {
			outputBuffer = await sharp(inputPath).png({ quality }).toBuffer();

			const compressedSizeKB = Math.round(outputBuffer.length / 1024);
			console.log(`Quality ${quality}: ${compressedSizeKB}KB`);

			if (compressedSizeKB <= maxSizeKB || quality <= 20) {
				break;
			}

			quality -= 10;
		} while (quality > 20);

		// Write compressed image
		fs.writeFileSync(outputPath, outputBuffer);

		const finalStats = fs.statSync(outputPath);
		const finalSizeKB = Math.round(finalStats.size / 1024);
		const reduction = Math.round(
			((originalSizeKB - finalSizeKB) / originalSizeKB) * 100,
		);

		console.log(
			`✅ Compressed ${inputPath}: ${originalSizeKB}KB → ${finalSizeKB}KB (${reduction}% reduction)`,
		);
		console.log("");
	} catch (error) {
		console.error(`❌ Error compressing ${inputPath}:`, error.message);
	}
}

async function compressAllImages() {
	console.log("🖼️  Starting image compression...\n");

	for (const image of imagesToCompress) {
		if (fs.existsSync(image.input)) {
			await compressImage(image.input, image.output, image.maxSize);
		} else {
			console.log(`⚠️  File not found: ${image.input}`);
		}
	}

	console.log("🎉 Image compression completed!");
	console.log("\n📝 Next steps:");
	console.log("1. Review the compressed images");
	console.log(
		"2. Replace original files with compressed versions if satisfied",
	);
	console.log("3. Update any hardcoded image paths if needed");
}

compressAllImages().catch(console.error);
