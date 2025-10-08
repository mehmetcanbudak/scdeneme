import type React from "react";
import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";

/**
 * Week program interface
 */
interface WeekProgram {
	weekNumber: number;
	description: string;
}

/**
 * Props for WeeklyProgram component
 */
interface WeeklyProgramProps {
	onViewPlans: () => void;
	className?: string;
}

/**
 * Weekly program component showing example weeks
 * Displays sample weekly vegetable packages
 *
 * @param {WeeklyProgramProps} props - Component props
 * @returns {React.ReactElement} The weekly program component
 */
const WeeklyProgram: React.FC<WeeklyProgramProps> = memo(({ onViewPlans, className = "" }) => {
	/**
	 * Example weeks data with memoization
	 */
	const exampleWeeks: WeekProgram[] = useMemo(
		() => [
			{
				weekNumber: 1,
				description:
					"2 adet kıvırcık ile birlikte endivyen, arugula, maydanoz, frenk soğanı, tere ve kekik",
			},
			{
				weekNumber: 2,
				description:
					"2 adet kıvırcık, kale, roka, maydanoz, frenk soğanı, mizuna ve fesleğen",
			},
			{
				weekNumber: 3,
				description:
					"Kıvırcık, endivyen veya yağlı yaprak, semizotu, dereotu, maydanoz, kuzu kulağı, amarant ve kale",
			},
			{
				weekNumber: 4,
				description:
					"Kıvırcık, kale veya lolorosso, roka, maydanoz, frenk soğanı, kırmızı damarlı kuzu kulağı, mor fesleğen ve tere",
			},
		],
		[],
	);

	return (
		<div className={`lg:sticky lg:top-8 ${className}`}>
			<div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
				<div className="text-center mb-8">
					<div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
						<span className="text-3xl">📅</span>
					</div>
					<h3 className="text-3xl font-medium text-gray-800 mb-4">
						Örnek Haftalık Programlar
					</h3>
					<p className="text-gray-600 leading-relaxed">
						Aboneliğinizle birlikte her hafta sofranıza farklı kombinasyonlarda 8
						adet taptaze yeşillik gelir.
					</p>
				</div>

				{/* Example Weeks */}
				<div className="space-y-6">
					{exampleWeeks.map((week) => (
						<div key={week.weekNumber} className="bg-gray-50 rounded-lg p-6">
							<h4 className="font-medium text-gray-800 mb-3 flex items-center">
								<span className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
									{week.weekNumber}
								</span>
								Örnek Hafta
							</h4>
							<p className="text-sm text-gray-600 leading-relaxed">
								{week.description}
							</p>
						</div>
					))}
				</div>

				<div className="mt-8 text-center">
					<Button onClick={onViewPlans} className="w-full px-8 py-3">
						Abonelik Planlarını İncele
					</Button>
				</div>
			</div>
		</div>
	);
});

WeeklyProgram.displayName = "WeeklyProgram";

export default WeeklyProgram;
