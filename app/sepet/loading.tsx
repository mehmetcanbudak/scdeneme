export default function Loading() {
	return (
		<div className="min-h-screen bg-gray-50">
			<main className="pt-24 pb-8 px-6">
				<div className="mx-12">
					{/* Header Skeleton */}
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center space-x-4">
							<div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
							<div className="h-6 w-px bg-gray-300"></div>
							<div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Cart Items Skeleton */}
						<div className="lg:col-span-2">
							<div className="bg-white rounded-lg shadow-sm border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
								</div>

								<div className="divide-y divide-gray-200">
									{[...Array(3)].map((_, i) => (
										<div key={i} className="p-6">
											<div className="flex space-x-4">
												{/* Image Skeleton */}
												<div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse"></div>

												{/* Content Skeleton */}
												<div className="flex-1 space-y-3">
													<div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
													<div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
													<div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
													<div className="flex justify-between items-center">
														<div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
														<div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Summary Skeleton */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-sm border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
								</div>

								<div className="p-6 space-y-4">
									<div className="flex justify-between">
										<div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
										<div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
									</div>
									<div className="flex justify-between">
										<div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
										<div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
									</div>
									<div className="border-t border-gray-200 pt-4">
										<div className="flex justify-between">
											<div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
											<div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
										</div>
									</div>
									<div className="h-12 bg-gray-200 rounded animate-pulse mt-6"></div>
									<div className="h-12 bg-gray-200 rounded animate-pulse"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
