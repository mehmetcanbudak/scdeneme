import { NextResponse } from "next/server";

export async function GET() {
	try {
		const base = process.env.PAYLOAD_API_URL;
		if (!base)
			return NextResponse.json(
				{ error: "Missing PAYLOAD_API_URL" },
				{ status: 500 },
			);

		const qs = new URLSearchParams();
		qs.set("limit", "100");
		qs.set("depth", "0");
		qs.set("sort", "-createdAt");

		const res = await fetch(`${base}/api/subscription-plans?${qs.toString()}`, {
			cache: "no-store",
			headers: { "Content-Type": "application/json" },
		});

		if (!res.ok) {
			const txt = await res.text();
			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to fetch subscription plans",
					details: txt,
				},
				{ status: res.status },
			);
		}

		const json = await res.json();
		const docs = Array.isArray(json?.docs) ? json.docs : [];
		const data = docs.map((p: any) => ({
			id: p.id,
			name: p.name,
			description: p.description,
			price: p.price,
			currency: p.currency,
			billingCycle: p.billing_cycle || p.billingCycle || "weekly",
			features: Array.isArray(p.features) ? p.features : [],
			isActive: p.is_active ?? true,
			createdAt: p.createdAt,
			updatedAt: p.updatedAt,
		}));

		return NextResponse.json({ data }, { status: 200 });
	} catch (err: any) {
		return NextResponse.json(
			{ error: "Server error", message: err?.message },
			{ status: 500 },
		);
	}
}
