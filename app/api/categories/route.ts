import { NextResponse } from "next/server";

function abs(url: string | null | undefined, base: string): string | null {
	if (!url) return null;
	if (url.startsWith("http")) return url;
	if (url.startsWith("/")) return `${base}${url}`;
	return `${base}/${url}`;
}

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
		qs.set("depth", "1");
		qs.set("sort", "name");

		const res = await fetch(`${base}/api/categories?${qs.toString()}`, {
			cache: "no-store",
			headers: { "Content-Type": "application/json" },
		});

		if (!res.ok) {
			const txt = await res.text();
			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to fetch categories from Payload",
					details: txt,
				},
				{ status: res.status },
			);
		}

		const json = await res.json();
		const docs = Array.isArray(json?.docs) ? json.docs : [];
		const data = docs.map((c: any) => ({
			id: c.id,
			name: c.name,
			slug: c.slug,
			description: c.description,
			image: c.image ? { url: abs(c.image?.url, base) } : null,
			createdAt: c.createdAt,
			updatedAt: c.updatedAt,
		}));

		return NextResponse.json(
			{ data, meta: { total: json?.totalDocs ?? data.length } },
			{ status: 200 },
		);
	} catch (err: any) {
		return NextResponse.json(
			{ error: "Server error", message: err?.message },
			{ status: 500 },
		);
	}
}
