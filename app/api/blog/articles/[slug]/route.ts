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

export async function GET(
	_req: Request,
	context: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await context.params;

		const PAYLOAD_URL = process.env.PAYLOAD_API_URL;
		if (!PAYLOAD_URL) {
			return NextResponse.json(
				{ error: "Missing PAYLOAD_API_URL" },
				{ status: 500 },
			);
		}

		const qs = new URLSearchParams();
		qs.set("where[slug][equals]", slug);
		qs.set("limit", "1");
		qs.set("depth", "1");

		const res = await fetch(`${PAYLOAD_URL}/api/articles?${qs.toString()}`, {
			cache: "no-store",
			headers: { "Content-Type": "application/json" },
		});

		if (!res.ok) {
			const txt = await res.text();
			if (res.status === 404) {
				return NextResponse.json({ data: null }, { status: 404 });
			}
			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to fetch article from Payload",
					details: txt,
				},
				{ status: res.status },
			);
		}

		const json = await res.json();
		const doc =
			Array.isArray(json?.docs) && json.docs.length > 0 ? json.docs[0] : null;

		if (!doc) {
			return NextResponse.json({ data: null }, { status: 404 });
		}

		const article = {
			title: doc.title,
			slug: doc.slug,
			excerpt: doc.excerpt,
			content: doc.content ? lexicalToHTML(doc.content) : undefined,
			readTime: doc.readTime,
			createdAt: doc.createdAt,
			cover:
				doc.cover && typeof doc.cover === "object"
					? { url: toAbsoluteUrl(doc.cover.url || doc.cover?.url, PAYLOAD_URL) }
					: undefined,
		};

		return NextResponse.json({ data: article }, { status: 200 });
	} catch (err: unknown) {
		return NextResponse.json(
			{ error: "Server error", message: (err as Error)?.message },
			{ status: 500 },
		);
	}
}
