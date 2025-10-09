export default function Loading() {
	return (
		<div className="min-h-screen bg-white flex items-center justify-center">
			<div className="text-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600 mx-auto mb-4"></div>
				<p className="text-black text-lg">Yükleniyor...</p>
			</div>
		</div>
	);
}
