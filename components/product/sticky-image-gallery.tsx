"use client";

import { memo } from "react";

/**
 * Props for StickyImageGallery component
 */
interface StickyImageGalleryProps {
	/** Array of image URLs to display */
	images: string[];
	/** Currently selected image index */
	selectedImage: number;
	/** Callback when image selection changes */
	onImageSelect: (index: number) => void;
	/** Product name for alt text */
	productName: string;
}

/**
 * Sticky Image Gallery Component
 * Displays a sticky image gallery that remains visible while scrolling
 *
 * @param {StickyImageGalleryProps} props - Component props
 * @returns {React.ReactElement} The sticky image gallery component
 */
const StickyImageGallery: React.FC<StickyImageGalleryProps> = memo(
	({ images, selectedImage, onImageSelect, productName }) => {
		return (
			<div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 bg-gray-50">
				<div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
					<div className="max-w-md w-full">
						<img
							src={images[selectedImage]}
							alt={productName}
							className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg"
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = "/skycrops-package-product.png";
							}}
						/>
						{/* Thumbnail Images */}
						{images.length > 1 && (
							<div className="flex space-x-2 mt-4 justify-center">
								{images.map((image, index) => (
									<button
										key={`thumbnail-${image.slice(-20)}-${index}`}
										type="button"
										onClick={() => onImageSelect(index)}
										className={`w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
											selectedImage === index
												? "border-gray-600"
												: "border-gray-200"
										}`}
									>
										<img
											src={image}
											alt={`Thumbnail ${index + 1}`}
											className="w-full h-full object-cover"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.src = "/placeholder.svg";
											}}
										/>
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	},
);

StickyImageGallery.displayName = "StickyImageGallery";

export default StickyImageGallery;
