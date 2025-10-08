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
			<div className={`bg-white rounded-lg p-8 shadow-sm border border-gray-100 ${className}`}>
				<div className="flex items-start space-x-4 mb-6">
					<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
						<span className="text-2xl">{emoji}</span>
					</div>
					<div>
						<h3 className="text-2xl font-medium text-gray-800 mb-3">{title}</h3>
						<p className="text-gray-600 leading-relaxed">{description}</p>
					</div>
				</div>
			</div>
		);
	},
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
