import { NextResponse } from "next/server";

export async function PUT(
	req: Request,
	ctx: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await ctx.params;
		const base = process.env.PAYLOAD_API_URL;
		if (!base)
			return NextResponse.json(
				{ error: "Missing PAYLOAD_API_URL" },
				{ status: 500 },
			);

		const body = await req.json().catch(() => ({}));

		const res = await fetch(`${base}/cart/items/${encodeURIComponent(id)}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			const txt = await res.text();
			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to update cart item in Payload",
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

export async function DELETE(
	_req: Request,
	ctx: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await ctx.params;
		const base = process.env.PAYLOAD_API_URL;
		if (!base)
			return NextResponse.json(
				{ error: "Missing PAYLOAD_API_URL" },
				{ status: 500 },
			);

		const res = await fetch(`${base}/cart/items/${encodeURIComponent(id)}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});

		if (!res.ok) {
			const txt = await res.text();
			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to remove cart item in Payload",
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
