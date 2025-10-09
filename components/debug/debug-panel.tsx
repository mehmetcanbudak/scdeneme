"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { Bug, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function DebugPanel() {
	const { user, token, isAuthenticated, error: authError } = useAuth();
	const {
		items,
		totalItems,
		totalPrice,
		isLoading,
		error: cartError,
		getSessionId,
		loadCart,
	} = useCart();

	const [sessionId, setSessionId] = useState<string>("");
	const [isClient, setIsClient] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// Handle hydration by only showing session ID on client
	useEffect(() => {
		setIsClient(true);
		setSessionId(getSessionId());
	}, [getSessionId]);

	const handleTestCart = async () => {
		console.log("Testing cart load...");
		await loadCart();
	};

	const handleTestAddToCart = async () => {
		console.log("Testing add to cart...");
		// This would require a real product ID from your backend
		// await addItem(1, 1, "one_time");
	};

	if (process.env.NODE_ENV === "production") {
		return null; // Don't show in production
	}

	return (
		<>
			{/* Toggle Button */}
			<Button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-4 right-4 z-50 bg-black hover:bg-gray-800 text-white p-2 rounded-full shadow-lg"
				size="sm"
			>
				{isOpen ? <X size={16} /> : <Bug size={16} />}
			</Button>

			{/* Debug Panel */}
			{isOpen && (
				<Card className="fixed bottom-4 right-16 w-96 max-h-96 overflow-auto z-50 bg-black text-white">
					<CardHeader>
						<CardTitle className="text-sm">Debug Panel</CardTitle>
					</CardHeader>
					<CardContent className="text-xs space-y-2">
						<div>
							<strong>Payload API URL:</strong>{" "}
							{process.env.PAYLOAD_API_URL || "(unset)"}
						</div>

						<div>
							<strong>Auth Status:</strong>
							<ul className="ml-4">
								<li>Authenticated: {isAuthenticated ? "✅" : "❌"}</li>
								<li>User ID: {user?.id || "None"}</li>
								<li>Token: {token ? "✅ Present" : "❌ Missing"}</li>
								<li>Auth Error: {authError || "None"}</li>
							</ul>
						</div>

						<div>
							<strong>Cart Status:</strong>
							<ul className="ml-4">
								<li>Session ID: {isClient ? sessionId : "Loading..."}</li>
								<li>Items Count: {totalItems}</li>
								<li>Total Price: {totalPrice}</li>
								<li>Loading: {isLoading ? "✅" : "❌"}</li>
								<li>Cart Error: {cartError || "None"}</li>
							</ul>
						</div>

						<div>
							<strong>Cart Items:</strong>
							<pre className="bg-gray-800 p-2 rounded text-xs overflow-auto max-h-20">
								{JSON.stringify(items, null, 2)}
							</pre>
						</div>

						<div className="flex gap-2">
							<Button
								size="sm"
								onClick={handleTestCart}
								className="text-xs py-1 px-2"
							>
								Load Cart
							</Button>
							<Button
								size="sm"
								onClick={handleTestAddToCart}
								className="text-xs py-1 px-2"
							>
								Test Add
							</Button>
						</div>
					</CardContent>
				</Card>
			)}
		</>
	);
}
