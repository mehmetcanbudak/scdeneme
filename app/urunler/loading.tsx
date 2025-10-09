export default function Loading() {
	return (
		<div className="min-h-screen bg-[#9AB795] flex items-center justify-center">
			<div className="text-center">
				<div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
				<p className="text-white">Ürünler yükleniyor...</p>
			</div>
		</div>
	);
}
