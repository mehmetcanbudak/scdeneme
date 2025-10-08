"use client";

import { ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useEffect } from "react";
import Logo from "./logo";

interface MobileSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	items: Array<{ href: string; label: string }>;
	shouldBeTransparent: boolean;
}

const MobileSidebar = memo(function MobileSidebar({
	isOpen,
	onClose,
	items,
	shouldBeTransparent: _,
}: MobileSidebarProps) {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	};

	// Handle ESC key press
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		},
		[onClose],
	);

	// Handle click outside
	const handleBackdropClick = useCallback(
		(event: React.MouseEvent) => {
			if (event.target === event.currentTarget) {
				onClose();
			}
		},
		[onClose],
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, handleKeyDown]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[99999] nav:hidden">
			{/* Backdrop with smooth fade-in */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
				onClick={handleBackdropClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						handleBackdropClick(e);
					}
				}}
				tabIndex={-1}
				aria-hidden="true"
			/>

			{/* Sidebar with slide-in animation */}
			<div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl animate-in slide-in-from-left duration-300 ease-out overflow-y-auto">
				<div className="flex flex-col min-h-full">
					{/* Header with Logo */}
					<div className="flex items-center justify-between p-6 border-b border-gray-100">
						<Link
							href="/"
							onClick={onClose}
							className="flex-shrink-0 transition-opacity hover:opacity-80"
						>
							<Logo className="h-8 w-auto" />
						</Link>
						<button
							type="button"
							onClick={onClose}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
							aria-label="Close menu"
						>
							<X className="w-5 h-5 text-gray-600" />
						</button>
					</div>

					{/* Search Bar - moved below logo - HIDDEN FOR NOW */}
					{/* <div className="px-6 py-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div> */}

					{/* Navigation Items */}
					<nav className="flex-1 px-6 py-4">
						<ul className="space-y-1">
							{items.map((item) => {
								const active = isActive(item.href);
								return (
									<li key={item.href}>
										<Link
											href={item.href}
											onClick={onClose}
											className={`relative block py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
												active
													? "text-gray-800 bg-gray-100 border-l-4 border-gray-600"
													: "text-gray-700 hover:text-black hover:bg-gray-50"
											}`}
										>
											<span className="relative z-10">{item.label}</span>
											{active && (
												<span className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-600 rounded-full" />
											)}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					{/* Bottom Section - User Actions moved to bottom */}
					<div className="border-t border-gray-100 p-6 space-y-4">
						{/* User Actions */}
						<div className="space-y-2">
							<Link
								href="/cart"
								onClick={onClose}
								className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
							>
								<ShoppingBag className="w-5 h-5 text-gray-600" />
								<span className="text-sm font-medium text-gray-700">
									Sepetim
								</span>
							</Link>

							{/* Language Selector */}
							<div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
								<span className="text-sm text-gray-600">🇹🇷</span>
								<span className="text-sm font-medium text-gray-700">
									Türkçe
								</span>
							</div>

							<Link
								href="/login"
								onClick={onClose}
								className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
							>
								<User className="w-5 h-5 text-gray-600" />
								<span className="text-sm font-medium text-gray-700">
									Giriş Yap
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default MobileSidebar;
