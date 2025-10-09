import type React from "react";
import { memo } from "react";

/**
 * Props for FeatureCard component
 */
interface FeatureCardProps {
	emoji: string;
	title: string;
	description: string;
	className?: string;
}

/**
 * Feature card component for subscription benefits
 * Displays a feature with emoji, title and description
 *
 * @param {FeatureCardProps} props - Component props
 * @returns {React.ReactElement} The feature card component
 */
const FeatureCard: React.FC<FeatureCardProps> = memo(
	({ emoji, title, description, className = "" }) => {
		return (
			<div
				className={`bg-[#FDFBE2] rounded-3xl p-8 shadow-sm border border-black hover:shadow-md transition-all duration-300 ${className}`}
			>
				<div>
					<h3 className="text-2xl font-medium text-black mb-3">{title}</h3>
					<p className="text-black leading-relaxed">{description}</p>
				</div>
			</div>
		);
	},
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
