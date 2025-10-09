import { NextResponse } from "next/server";
import { lexicalToHTML } from "@/lib/lexicalToHtml";

function toAbsoluteUrl(
	url: string | null | undefined,
	base: string,
): string | null {
	if (!url) return null;
	if (url.startsWith("http")) return url;
	if (url.startsWith("/")) return `${base}${url}`;
	return `${base}/${url}`;
}

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const page = Number(url.searchParams.get("page") || "1");
		const pageSize = Number(url.searchParams.get("pageSize") || "12");

		const PAYLOAD_URL = process.env.PAYLOAD_API_URL;
		if (!PAYLOAD_URL) {
			return NextResponse.json(
				{ error: "Missing PAYLOAD_API_URL" },
				{ status: 500 },
			);
		}

		const params = new URLSearchParams();
		params.set("page", String(page));
		params.set("limit", String(pageSize));
		params.set("depth", "1");
		params.set("sort", "-createdAt");

		const res = await fetch(
			`${PAYLOAD_URL}/api/articles?${params.toString()}`,
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
					message: "Failed to fetch articles from Payload",
					details: txt,
				},
				{ status: res.status },
			);
		}

		const json = await res.json();
		const docs = Array.isArray(json?.docs) ? json.docs : [];

		const data = docs.map((doc: any) => {
			return {
				title: doc.title,
				slug: doc.slug,
				excerpt: doc.excerpt,
				content: doc.content ? lexicalToHTML(doc.content) : undefined,
				readTime: doc.readTime,
				createdAt: doc.createdAt,
				cover:
					doc.cover && typeof doc.cover === "object"
						? {
								url: toAbsoluteUrl(
									doc.cover.url || doc.cover?.url,
									PAYLOAD_URL,
								),
							}
						: undefined,
			};
		});

		const meta = {
			pagination: {
				page: json?.page ?? page,
				pageSize: json?.limit ?? pageSize,
				pageCount: json?.totalPages ?? 1,
				total: json?.totalDocs ?? data.length,
			},
		};

		return NextResponse.json({ data, meta }, { status: 200 });
	} catch (err: any) {
		return NextResponse.json(
			{ error: "Server error", message: err?.message },
			{ status: 500 },
		);
	}
}
