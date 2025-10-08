export default function ProfileSettingsLoading() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse" />
					<div className="h-4 bg-gray-200 rounded w-96 animate-pulse" />
				</div>

				<div className="space-y-6">
					{/* Profile Information Card */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
						<div className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
									<div className="h-10 bg-gray-200 rounded animate-pulse" />
								</div>
								<div className="space-y-2">
									<div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
									<div className="h-10 bg-gray-200 rounded animate-pulse" />
								</div>
							</div>
							<div className="h-10 bg-gray-200 rounded animate-pulse" />
						</div>
					</div>

					{/* Email Verification Card */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="h-6 bg-gray-200 rounded w-36 mb-4 animate-pulse" />
						<div className="space-y-4">
							<div className="space-y-2">
								<div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
								<div className="h-10 bg-gray-200 rounded animate-pulse" />
							</div>
							<div className="h-10 bg-gray-200 rounded animate-pulse" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
