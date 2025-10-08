"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import LoadingScreen from "./loading-screen";

const FADE_OUT_DURATION = 400;
const IMAGE_WAIT_TIMEOUT = 800;
const ASSET_READY_KEY = "skycrops-assets-ready";
const LOADER_SKIP_KEY = "skycrops-loader-skip";

const ASSET_MANIFEST = [
	"/skycrops-logo.svg",
	"/skycrops.svg",
	"/skycrops-package-product.png",
	"/skycrops-web.mp4",
	"/skycrops-compressed.mp4",
	"/celenk.svg",
	"/farmımızda_yetisen_sebzeler/biz_skycrops.svg",
];

/**
 * Initial site loader component
 * Shows on initial page paint and during route transitions until critical assets load
 *
 * @returns {React.ReactElement | null} The initial loader component or null
 */
const InitialLoader = memo(function InitialLoader() {
	const [isVisible, setIsVisible] = useState(true);
	const [isFading, setIsFading] = useState(false);
	const assetManifest = useMemo(() => ASSET_MANIFEST, []);

	const isAssetReady = useCallback(() => {
		if (typeof window === "undefined") {
			return false;
		}

		return localStorage.getItem(ASSET_READY_KEY) === "true";
	}, []);

	const shouldSkipLoader = useCallback(() => {
		if (typeof window === "undefined") {
			return false;
		}

		return localStorage.getItem(LOADER_SKIP_KEY) === "true";
	}, []);

	const markAssetsReady = useCallback(() => {
		if (typeof window === "undefined") {
			return;
		}

		localStorage.setItem(ASSET_READY_KEY, "true");
		localStorage.setItem(LOADER_SKIP_KEY, "true");
	}, []);

	const isMountedRef = useRef(true);
	const isFirstRouteRef = useRef(true);
	const activeCycleRef = useRef(0);
	const timeoutIdsRef = useRef<number[]>([]);
	const cleanupCallbacksRef = useRef<Array<() => void>>([]);

	const clearTimersAndListeners = useCallback(() => {
		timeoutIdsRef.current.forEach((id) => {
			window.clearTimeout(id);
		});
		timeoutIdsRef.current = [];

		cleanupCallbacksRef.current.forEach((cleanup) => {
			cleanup();
		});
		cleanupCallbacksRef.current = [];
	}, []);

	const startLoadingCycle = useCallback(() => {
		activeCycleRef.current += 1;
		const cycleId = activeCycleRef.current;

		clearTimersAndListeners();

		if (!isMountedRef.current) {
			return;
		}

		if (isAssetReady() || shouldSkipLoader()) {
			setIsVisible(false);
			return;
		}

		setIsVisible(true);
		setIsFading(false);

		const settleAndHide = () => {
			if (!isMountedRef.current || activeCycleRef.current !== cycleId) {
				return;
			}

			setIsFading(true);

			const hideTimeout = window.setTimeout(() => {
				if (!isMountedRef.current || activeCycleRef.current !== cycleId) {
					return;
				}

				setIsVisible(false);
			}, FADE_OUT_DURATION);

			timeoutIdsRef.current.push(hideTimeout);
		};

		const waitForDocumentReady = new Promise<void>((resolve) => {
			if (document.readyState === "complete") {
				resolve();
				return;
			}

			const handleLoad = () => {
				window.removeEventListener("load", handleLoad);
				resolve();
			};

			window.addEventListener("load", handleLoad, { once: true });
			cleanupCallbacksRef.current.push(() =>
				window.removeEventListener("load", handleLoad),
			);
		});

		const waitForManifestAssets = new Promise<void>((resolve) => {
			if (typeof window === "undefined") {
				resolve();
				return;
			}

			let resolved = false;

			const settle = () => {
				if (resolved) {
					return;
				}

				resolved = true;
				resolve();
			};

			const timeoutId = window.setTimeout(() => {
				settle();
			}, IMAGE_WAIT_TIMEOUT);

			timeoutIdsRef.current.push(timeoutId);

			Promise.allSettled(
				assetManifest.map(async (asset) => {
					if (asset.endsWith(".mp4")) {
						await fetch(asset, { method: "GET", cache: "force-cache" });
						return;
					}

					if (asset.endsWith(".svg") || asset.endsWith(".png")) {
						const image = new Image();
						await new Promise<void>((resolveImage, rejectImage) => {
							image.addEventListener(
								"load",
								() => {
									resolveImage();
								},
								{
									once: true,
								},
							);
							image.addEventListener(
								"error",
								(e) => {
									rejectImage(e);
								},
								{
									once: true,
								},
							);
							image.src = asset;
						});
						return;
					}

					await fetch(asset, { cache: "force-cache" });
				}),
			)
				.then(() => {
					markAssetsReady();
					settle();
				})
				.catch(() => {
					settle();
				});
		});

		Promise.all([waitForDocumentReady, waitForManifestAssets])
			.catch(() => null)
			.then(() => settleAndHide());
	}, [
		clearTimersAndListeners,
		assetManifest,
		markAssetsReady,
		isAssetReady,
		shouldSkipLoader,
	]);

	useEffect(() => {
		startLoadingCycle();

		return () => {
			isMountedRef.current = false;
			clearTimersAndListeners();
		};
	}, [startLoadingCycle, clearTimersAndListeners]);

	useEffect(() => {
		if (isFirstRouteRef.current) {
			isFirstRouteRef.current = false;
			return;
		}

		startLoadingCycle();
	}, [startLoadingCycle]);

	if (!isVisible) {
		return null;
	}

	return (
		<div
			className={`fixed inset-0 z-[9999] bg-white transition-opacity duration-500 ${
				isFading ? "opacity-0" : "opacity-100"
			}`}
		>
			<LoadingScreen fullScreen={false} className="h-full" />
		</div>
	);
});

export default InitialLoader;
