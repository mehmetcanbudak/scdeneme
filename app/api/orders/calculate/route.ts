import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const base = process.env.PAYLOAD_API_URL;
		if (!base)
			return NextResponse.json(
				{ error: "Missing PAYLOAD_API_URL" },
				{ status: 500 },
			);

		const body = await req.json().catch(() => ({}));

		const res = await fetch(`${base}/orders/calculate`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			const txt = await res.text();
			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to calculate order",
					details: txt,
				},
				{ status: res.status },
			);
		}

		const json = await res.json();
		return NextResponse.json(json, { status: 200 });
	} catch (err: any) {
		return NextResponse.json(
			{ error: "Server error", message: err?.message },
			{ status: 500 },
		);
	}
}
