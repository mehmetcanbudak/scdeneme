import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const sessionId = searchParams.get("sessionId");
		if (!sessionId) {
			return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
		}

		const base = process.env.PAYLOAD_API_URL;
		if (!base)
			return NextResponse.json(
				{ error: "Missing PAYLOAD_API_URL" },
				{ status: 500 },
			);

		const res = await fetch(
			`${base}/cart?sessionId=${encodeURIComponent(sessionId)}`,
			{
				cache: "no-store",
				headers: { "Content-Type": "application/json" },
			},
		);

		if (!res.ok) {
			const txt = await res.text();
			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to fetch cart from Payload",
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
