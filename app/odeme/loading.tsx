export default function Loading() {
	return (
		<div className="min-h-screen bg-gray-50">
			<main className="pt-24 pb-8 px-6">
				<div className="mx-12">
					{/* Header Skeleton */}
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center space-x-4">
							<div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
							<div className="h-6 w-px bg-gray-300"></div>
							<div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Checkout Form Skeleton */}
						<div className="lg:col-span-2 space-y-6">
							{/* Address Section Skeleton */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
								</div>
								<div className="p-6 space-y-4">
									{[...Array(2)].map((_, i) => (
										<div
											key={i}
											className="p-4 rounded-lg border border-gray-200"
										>
											<div className="space-y-2">
												<div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
												<div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
												<div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
												<div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Delivery Options Skeleton */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
								</div>
								<div className="p-6">
									<div className="p-4 rounded-lg border border-gray-200">
										<div className="flex justify-between">
											<div className="space-y-2 flex-1">
												<div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
												<div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
											</div>
											<div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
										</div>
									</div>
								</div>
							</div>

							{/* Payment Method Skeleton */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<div className="h-6 bg-gray-200 rounded w-36 animate-pulse"></div>
								</div>
								<div className="p-6">
									<div className="bg-gray-100 rounded-lg p-4">
										<div className="space-y-2">
											<div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
											<div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
											<div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Order Summary Skeleton */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-sm border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
								</div>

								<div className="p-6">
									{/* Items Skeleton */}
									<div className="space-y-4 mb-6">
										{[...Array(3)].map((_, i) => (
											<div key={i} className="flex space-x-3">
												<div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
												<div className="flex-1 space-y-2">
													<div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
													<div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
													<div className="flex justify-between">
														<div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
														<div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
													</div>
												</div>
											</div>
										))}
									</div>

									{/* Totals Skeleton */}
									<div className="space-y-3 border-t border-gray-200 pt-4">
										<div className="flex justify-between">
											<div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
											<div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
										</div>
										<div className="flex justify-between">
											<div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
											<div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
										</div>
										<div className="border-t border-gray-200 pt-3">
											<div className="flex justify-between">
												<div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
												<div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
											</div>
										</div>
									</div>

									{/* Button Skeleton */}
									<div className="mt-6">
										<div className="h-12 bg-gray-200 rounded animate-pulse"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
