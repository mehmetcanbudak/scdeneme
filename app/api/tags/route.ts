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
		qs.set("sort", "name");

		const res = await fetch(`${base}/api/tags?${qs.toString()}`, {
			cache: "no-store",
			headers: { "Content-Type": "application/json" },
		});

		if (!res.ok) {
			const txt = await res.text();
			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to fetch tags from Payload",
					details: txt,
				},
				{ status: res.status },
			);
		}

		const json = await res.json();
		const docs = Array.isArray(json?.docs) ? json.docs : [];
		const data = docs.map((t: any) => ({
			id: t.id,
			name: t.name,
			slug: t.slug,
			color: t.color,
		}));

		return NextResponse.json(
			{
				data,
				meta: {
					pagination: {
						page: json?.page ?? 1,
						pageSize: json?.limit ?? data.length,
						pageCount: json?.totalPages ?? 1,
						total: json?.totalDocs ?? data.length,
					},
				},
			},
			{ status: 200 },
		);
	} catch (err: any) {
		return NextResponse.json(
			{ error: "Server error", message: err?.message },
			{ status: 500 },
		);
	}
}
