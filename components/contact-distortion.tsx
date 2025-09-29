"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

const VERTEX_SHADER = `varying vec2 vUv; uniform vec2 uDelta; uniform float uAmplitude; void main() { vUv = uv; vec3 newPosition = position; newPosition.x += sin(uv.y * 3.141592653589793) * uDelta.x * uAmplitude; newPosition.y += sin(uv.x * 3.141592653589793) * uDelta.y * uAmplitude; gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0); }`;

const FRAGMENT_SHADER = `varying vec2 vUv; uniform sampler2D uTexture; uniform float uAlpha; void main() { vec3 tex = texture2D(uTexture, vUv).rgb; gl_FragColor = vec4(tex, uAlpha); }`;

type DistortionItem = {
	title: string;
	description: string;
	image: string;
};

type ContactDistortionProps = {
	items: DistortionItem[];
	className?: string;
};

type RuntimeRefs = {
	renderer: THREE.WebGLRenderer | null;
	camera: THREE.OrthographicCamera | null;
	plane: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null;
	uniforms: {
		uTexture: { value: THREE.Texture | null };
		uDelta: { value: THREE.Vector2 };
		uAmplitude: { value: number };
		uAlpha: { value: number };
	} | null;
	textures: THREE.Texture[];
	size: { width: number; height: number };
	pointer: { x: number; y: number; targetX: number; targetY: number };
	alpha: { value: number; target: number };
	currentIndex: number;
	ready: boolean;
};

export function ContactDistortion({
	items,
	className,
}: ContactDistortionProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const canvasHostRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [texturesReady, setTexturesReady] = useState(false);

	const runtimeRef = useRef<RuntimeRefs>({
		renderer: null,
		camera: null,
		plane: null,
		uniforms: null,
		textures: [],
		size: { width: 1, height: 1 },
		pointer: { x: 0, y: 0, targetX: 0, targetY: 0 },
		alpha: { value: 0, target: 0 },
		currentIndex: 0,
		ready: false,
	});

	const animationRef = useRef<number | null>(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	const itemsMemo = useMemo(() => items, [items]);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		const canvasHost = canvasHostRef.current;
		if (!wrapper || !canvasHost || itemsMemo.length === 0) {
			return;
		}

		const runtime = runtimeRef.current;
		let disposed = false;

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.domElement.style.position = "absolute";
		renderer.domElement.style.inset = "0";
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		renderer.domElement.style.pointerEvents = "none";
		canvasHost.appendChild(renderer.domElement);

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000);
		camera.position.z = 1;

		const geometry = new THREE.PlaneGeometry(1, 1, 64, 64);

		const uniforms = {
			uTexture: { value: null as THREE.Texture | null },
			uDelta: { value: new THREE.Vector2(0, 0) },
			uAmplitude: { value: 0.0012 },
			uAlpha: { value: 0 },
		};

		const material = new THREE.ShaderMaterial({
			uniforms,
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_SHADER,
			transparent: true,
		});

		const plane = new THREE.Mesh(geometry, material);
		plane.visible = false;
		scene.add(plane);

		runtime.renderer = renderer;
		runtime.camera = camera;
		runtime.plane = plane;
		runtime.uniforms = uniforms;

		const textureLoader = new THREE.TextureLoader();

		const loadTextures = async () => {
			try {
				const textures = await Promise.all(
					itemsMemo.map((item) => textureLoader.loadAsync(item.image)),
				);
				if (disposed) return;
				const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
				textures.forEach((texture) => {
					texture.anisotropy = maxAnisotropy;
					texture.colorSpace = THREE.SRGBColorSpace;
				});
				runtime.textures = textures;
				runtime.ready = true;
				plane.visible = true;
				uniforms.uTexture.value = textures[0];
				updatePlaneSize(textures[0]);
				setTexturesReady(true);
			} catch (error) {
				console.error("Failed to load contact distortion textures", error);
			}
		};

		loadTextures();

		function updatePlaneSize(texture: THREE.Texture) {
			const { width, height } = texture.image as {
				width: number;
				height: number;
			};
			const { width: containerWidth } = runtime.size;

			const targetWidth = Math.min(containerWidth * 0.36, 420);
			const aspect = width && height ? width / height : 1;
			const computedHeight = targetWidth / aspect;

			plane.scale.set(targetWidth, computedHeight, 1);
		}

		function updateRendererSize() {
			const host = canvasHostRef.current;
			if (!host) return;
			const rect = host.getBoundingClientRect();
			runtime.size.width = rect.width;
			runtime.size.height = rect.height;

			renderer.setSize(rect.width, rect.height, false);

			camera.left = -rect.width / 2;
			camera.right = rect.width / 2;
			camera.top = rect.height / 2;
			camera.bottom = -rect.height / 2;
			camera.updateProjectionMatrix();

			if (runtime.textures[runtime.currentIndex]) {
				updatePlaneSize(runtime.textures[runtime.currentIndex]);
			}
		}

		updateRendererSize();

		const resizeObserver = new ResizeObserver(updateRendererSize);
		resizeObserver.observe(canvasHost);
		resizeObserverRef.current = resizeObserver;

		runtime.pointer.x = runtime.size.width / 2;
		runtime.pointer.y = runtime.size.height / 2;
		runtime.pointer.targetX = runtime.pointer.x;
		runtime.pointer.targetY = runtime.pointer.y;

		const handlePointerMove = (event: PointerEvent) => {
			const rect = wrapper.getBoundingClientRect();
			runtime.pointer.targetX = event.clientX - rect.left;
			runtime.pointer.targetY = event.clientY - rect.top;
		};

		const handlePointerLeave = () => {
			runtime.alpha.target = 0;
		};

		wrapper.addEventListener("pointermove", handlePointerMove);
		wrapper.addEventListener("pointerleave", handlePointerLeave);

		const renderLoop = () => {
			if (
				!runtime.renderer ||
				!runtime.camera ||
				!runtime.plane ||
				!runtime.uniforms
			) {
				animationRef.current = requestAnimationFrame(renderLoop);
				return;
			}

			runtime.pointer.x += (runtime.pointer.targetX - runtime.pointer.x) * 0.14;
			runtime.pointer.y += (runtime.pointer.targetY - runtime.pointer.y) * 0.14;

			const deltaX = runtime.pointer.targetX - runtime.pointer.x;
			const deltaY = runtime.pointer.targetY - runtime.pointer.y;

			runtime.uniforms.uDelta.value.set(deltaX, -deltaY);

			const speed = Math.min(
				Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 0.0018,
				0.004,
			);
			runtime.uniforms.uAmplitude.value = 0.0012 + speed;

			runtime.alpha.value +=
				(runtime.alpha.target - runtime.alpha.value) * 0.12;
			runtime.uniforms.uAlpha.value = runtime.alpha.value;

			runtime.plane.position.x = runtime.pointer.x - runtime.size.width / 2;
			runtime.plane.position.y = runtime.size.height / 2 - runtime.pointer.y;

			runtime.renderer.render(scene, camera);
			animationRef.current = requestAnimationFrame(renderLoop);
		};

		animationRef.current = requestAnimationFrame(renderLoop);

		return () => {
			disposed = true;
			cancelAnimationFrame(animationRef.current ?? 0);
			wrapper.removeEventListener("pointermove", handlePointerMove);
			wrapper.removeEventListener("pointerleave", handlePointerLeave);
			resizeObserver.disconnect();
			resizeObserverRef.current = null;

			scene.remove(plane);
			geometry.dispose();
			material.dispose();
			runtime.textures.forEach((texture) => {
				texture.dispose();
			});
			renderer.dispose();

			if (canvasHost.contains(renderer.domElement)) {
				canvasHost.removeChild(renderer.domElement);
			}

			runtime.renderer = null;
			runtime.camera = null;
			runtime.plane = null;
			runtime.uniforms = null;
			runtime.textures = [];
			runtime.ready = false;
			setTexturesReady(false);
		};
	}, [itemsMemo]);

	useEffect(() => {
		const runtime = runtimeRef.current;
		runtime.alpha.target = activeIndex === null ? 0 : 1;

		if (!texturesReady || activeIndex === null) {
			return;
		}

		if (!runtime.uniforms || !runtime.textures[activeIndex]) {
			return;
		}

		if (runtime.currentIndex !== activeIndex) {
			runtime.currentIndex = activeIndex;
			const texture = runtime.textures[activeIndex];
			runtime.uniforms.uTexture.value = texture;

			if (runtime.plane) {
				const { width } = runtime.size;
				const { width: imgWidth, height: imgHeight } = texture.image as {
					width: number;
					height: number;
				};
				const targetWidth = Math.min(width * 0.36, 420);
				const aspect = imgWidth && imgHeight ? imgWidth / imgHeight : 1;
				const computedHeight = targetWidth / aspect;
				runtime.plane.scale.set(targetWidth, computedHeight, 1);
			}
		}
	}, [activeIndex, texturesReady]);

	return (
		<div
			ref={wrapperRef}
			className={cn(
				"relative isolate overflow-hidden rounded-[32px] bg-green-50 text-black shadow-2xl",
				className,
			)}
		>
			<div className="absolute inset-0" ref={canvasHostRef} aria-hidden />

			<div className="relative z-10 grid gap-10 p-10 lg:grid-cols-[minmax(280px,0.45fr)_1fr] lg:p-14">
				<div className="space-y-6">
					<p className="text-sm uppercase tracking-[0.3em] text-black-400">
						SkyCrops ile bağlantıya geçin
					</p>
					<h2 className="text-3xl font-light leading-tight text-black md:text-4xl">
						Doğru ekiple anında bağlantı kurmanızı sağlayan akışkan bir iletişim
						deneyimi.
					</h2>
					<p className="max-w-xl text-base text-black-300">
						Aşağıdaki başlıklardan birini seçtiğinizde, ekibimizin hangi görsel
						dünyada çalıştığını keşfedin. Görsel izler imzamız, etkileyici iş
						akışımızın bir yansıması.
					</p>
				</div>

				<ul className="space-y-4">
					{itemsMemo.map((item, index) => {
						const isActive = activeIndex === index;
						return (
							<li key={item.title}>
								<button
									type="button"
									onMouseEnter={() => setActiveIndex(index)}
									onFocus={() => setActiveIndex(index)}
									onBlur={() => setActiveIndex(null)}
									onMouseLeave={() => setActiveIndex(null)}
									className={cn(
										"group block w-full rounded-3xl border border-white/5 bg-white/5 px-6 py-6 text-left transition duration-300",
										isActive
											? "backdrop-blur-md bg-lime-100/50 border-white/10"
											: "hover:bg-white/10",
									)}
								>
									<div className="flex items-baseline justify-between gap-4">
										<span
											className={cn(
												"text-2xl font-light uppercase tracking-wide text-white transition",
												isActive ? "text-black" : "text-black/80",
											)}
										>
											{item.title}
										</span>
										<span className="text-xs uppercase tracking-[0.3em] text-black/40">
											{index + 1}
										</span>
									</div>
									<p className="mt-3 text-sm text-black/70">
										{item.description}
									</p>
								</button>
							</li>
						);
					})}
				</ul>
			</div>

			{!texturesReady && (
				<div
					className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950"
					aria-hidden
				/>
			)}
		</div>
	);
}
