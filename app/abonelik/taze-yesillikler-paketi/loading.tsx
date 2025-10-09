export default function Loading() {
	return (
		<div className="min-h-screen bg-white flex items-center justify-center pt-24">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
				<p className="text-black">Taze Yeşillikler Paketi yükleniyor...</p>
			</div>
		</div>
	);
}
