"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useEffect, useState } from "react";

// Helper function to decode JWT token
function decodeJWT(token: string) {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join(""),
		);
		return JSON.parse(jsonPayload);
	} catch (error) {
		console.error("Error decoding JWT:", error);
		return null;
	}
}

export default function TestPage() {
	const {
		sendOTP,
		login,
		sendEmailVerification,
		verifyEmail,
		updateProfile,
		user,
		isAuthenticated,
		token,
	} = useAuth();

	const { addItem, items, loadCart } = useCart();

	const [phone, setPhone] = useState("+905555555555");
	const [otpCode, setOtpCode] = useState("");
	const [email, setEmail] = useState("test@example.com");
	const [verificationCode, setVerificationCode] = useState("");
	const [firstName, setFirstName] = useState("Test");
	const [lastName, setLastName] = useState("User");
	const [isClient, setIsClient] = useState(false);

	// Handle client-side hydration
	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleSendOTP = async () => {
		try {
			const result = await sendOTP(phone);
			console.log("Send OTP result:", result);
			alert("OTP sent! Check console for details.");
		} catch (error) {
			console.error("Send OTP error:", error);
			alert(
				"Failed to send OTP: " +
					(error instanceof Error ? error.message : "Unknown error"),
			);
		}
	};

	const handleVerifyOTP = async () => {
		try {
			const result = await login(phone, otpCode);
			console.log("Verify OTP result:", result);
			console.log(
				"JWT Token:",
				(result as { jwt?: string })?.jwt?.substring(0, 50) + "...",
			);
			alert("Login successful! Check console for JWT token.");
		} catch (error) {
			console.error("Verify OTP error:", error);
			alert(
				"Failed to verify OTP: " +
					(error instanceof Error ? error.message : "Unknown error"),
			);
		}
	};

	const handleSendEmailVerification = async () => {
		try {
			console.log("Sending email verification to:", email);
			console.log("Current auth token:", token?.substring(0, 50) + "...");

			// Test the /api/auth/me endpoint first
			console.log("Testing /api/auth/me first...");
			const meResponse = await fetch(
				"https://dynamic-spirit-b1c4404b11.strapiapp.com/api/auth/me",
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);
			console.log("/api/auth/me response status:", meResponse.status);
			const meData = await meResponse.json();
			console.log("/api/auth/me response data:", meData);

			if (meResponse.ok) {
				const result = await sendEmailVerification(email);
				console.log("Send email verification result:", result);
				alert("Email verification sent! Check your email.");
			} else {
				alert(
					`Authentication failed: ${meData.error?.message || "Unknown error"}`,
				);
			}
		} catch (error) {
			console.error("Send email verification error:", error);
			alert(
				"Failed to send email verification: " +
					(error instanceof Error ? error.message : "Unknown error"),
			);
		}
	};

	const handleVerifyEmail = async () => {
		try {
			console.log("Verifying email with code:", verificationCode);
			const result = await verifyEmail(email, verificationCode);
			console.log("Verify email result:", result);
			alert("Email verified successfully!");
		} catch (error) {
			console.error("Verify email error:", error);
			alert(
				"Failed to verify email: " +
					(error instanceof Error ? error.message : "Unknown error"),
			);
		}
	};

	const handleUpdateProfile = async () => {
		const result = await updateProfile({ firstName, lastName });
		console.log("Update profile result:", result);
	};

	const handleTestAddToCart = async () => {
		try {
			// Test with a sample product ID - adjust this based on your products
			console.log("Testing add to cart...");
			const result = await addItem(1, 1, "one_time");
			console.log("Add to cart result:", result);
			alert("Item added to cart successfully!");
		} catch (error) {
			console.error("Add to cart error:", error);
			alert(
				"Failed to add to cart: " +
					(error instanceof Error ? error.message : "Unknown error"),
			);
		}
	};

	const handleLoadCart = async () => {
		await loadCart();
		console.log("Cart items:", items);
	};

	return (
		<div className="container mx-auto p-8 space-y-6">
			<h1 className="text-3xl font-bold">Backend API Test Page</h1>

			{/* Authentication Test */}
			<Card>
				<CardHeader>
					<CardTitle>Authentication Test</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Input
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="Phone number"
						/>
						<Button onClick={handleSendOTP}>Send OTP</Button>
					</div>

					<div className="space-y-2">
						<Input
							value={otpCode}
							onChange={(e) => setOtpCode(e.target.value)}
							placeholder="OTP Code"
						/>
						<Button onClick={handleVerifyOTP}>Verify OTP</Button>
					</div>

					<div className="p-4 bg-gray-100 rounded space-y-2">
						<div>
							<strong>Auth Status:</strong>{" "}
							{isAuthenticated ? "Logged In" : "Not Logged In"}
						</div>
						<div>
							<strong>User:</strong>{" "}
							{user ? JSON.stringify(user, null, 2) : "None"}
						</div>
						<div>
							<strong>Token:</strong>{" "}
							{isClient && token ? token.substring(0, 50) + "..." : "None"}
						</div>
						{isClient && token && (
							<div>
								<strong>JWT Payload:</strong>
								<pre className="text-xs mt-1 bg-white p-2 rounded">
									{JSON.stringify(decodeJWT(token), null, 2)}
								</pre>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Email Verification Test */}
			{isAuthenticated && (
				<Card>
					<CardHeader>
						<CardTitle>Email Verification Test</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
							/>
							<Button onClick={handleSendEmailVerification}>
								Send Email Verification
							</Button>
						</div>

						<div className="space-y-2">
							<Input
								value={verificationCode}
								onChange={(e) => setVerificationCode(e.target.value)}
								placeholder="Verification Code"
							/>
							<Button onClick={handleVerifyEmail}>Verify Email</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Profile Update Test */}
			{isAuthenticated && (
				<Card>
					<CardHeader>
						<CardTitle>Profile Update Test</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Input
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="First Name"
							/>
							<Input
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Last Name"
							/>
							<Button onClick={handleUpdateProfile}>Update Profile</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* API Test */}
			{isAuthenticated && (
				<Card>
					<CardHeader>
						<CardTitle>Direct API Test</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button
							onClick={async () => {
								if (!token) {
									console.log("No token found");
									return;
								}

								console.log("Testing /api/auth/me endpoint...");
								try {
									const response = await fetch(
										"https://dynamic-spirit-b1c4404b11.strapiapp.com/api/auth/me",
										{
											headers: {
												Authorization: `Bearer ${token}`,
												"Content-Type": "application/json",
											},
										},
									);

									const data = await response.json();
									console.log("API Response Status:", response.status);
									console.log("API Response:", data);

									if (!response.ok) {
										alert(
											`API Error: ${response.status} - ${data.error?.message || "Unknown error"}`,
										);
									} else {
										alert("API Success!");
									}
								} catch (error) {
									console.error("API Test Error:", error);
									alert(
										"API Test Failed: " +
											(error instanceof Error
												? error.message
												: "Unknown error"),
									);
								}
							}}
						>
							Test /api/auth/me
						</Button>

						<Button
							onClick={async () => {
								if (!token) {
									alert("No token found - please login first");
									return;
								}

								const decoded = decodeJWT(token);
								if (!decoded?.uuid) {
									alert("No UUID found in token");
									return;
								}

								console.log("Fixing user UUID...");
								console.log("Target UUID:", decoded.uuid);
								console.log("Phone:", phone);

								try {
									const response = await fetch(
										"https://dynamic-spirit-b1c4404b11.strapiapp.com/api/auth/fix-uuid",
										{
											method: "POST",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify({
												phone: phone,
												targetUUID: decoded.uuid,
											}),
										},
									);

									const data = await response.json();
									console.log("Fix UUID Response Status:", response.status);
									console.log("Fix UUID Response:", data);

									if (!response.ok) {
										alert(
											`Fix UUID Error: ${response.status} - ${data.error?.message || data.message || "Unknown error"}`,
										);
									} else {
										alert(
											"UUID fixed successfully! You can now use email verification.",
										);
									}
								} catch (error) {
									console.error("Fix UUID Error:", error);
									alert(
										"Fix UUID Failed: " +
											(error instanceof Error
												? error.message
												: "Unknown error"),
									);
								}
							}}
							className="bg-green-600 hover:bg-green-700"
						>
							Fix User UUID
						</Button>

						<Button
							onClick={() => {
								// Clear all auth data
								if (isClient) {
									localStorage.removeItem("token");
									localStorage.removeItem("user");
									// Force page refresh to reset auth context
									window.location.reload();
								}
							}}
							className="bg-yellow-600 hover:bg-yellow-700"
						>
							Fresh Logout & Reload
						</Button>
					</CardContent>
				</Card>
			)}

			{/* Cart Test */}
			{isAuthenticated && (
				<Card>
					<CardHeader>
						<CardTitle>Cart Test</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button onClick={handleLoadCart}>Load Cart</Button>
						<Button onClick={handleTestAddToCart}>Test Add to Cart</Button>
						<div className="p-4 bg-gray-100 rounded">
							<strong>Cart Items:</strong>
							<pre>{JSON.stringify(items, null, 2)}</pre>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
