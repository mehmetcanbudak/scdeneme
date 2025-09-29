import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	context: { params: { slug: string } },
) {
	try {
		const { slug } = await context.params;

		const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;
		const TOKEN = process.env.STRAPI_API_TOKEN;

		if (!STRAPI_URL) {
			return NextResponse.json(
				{ error: "Missing NEXT_PUBLIC_API_URL" },
				{ status: 500 },
			);
		}

		const qs = new URLSearchParams();
		qs.set("populate[0]", "cover");
		// Filter by slug field
		qs.set("filters[slug][$eq]", slug);

		// Build headers with optional authentication
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};
		if (TOKEN) {
			headers.Authorization = `Bearer ${TOKEN}`;
		}

		// Use Strapi public articles endpoint with slug filter
		const res = await fetch(
			`${STRAPI_URL}/api/articles/public?${qs.toString()}`,
			{
				headers,
				cache: "no-store",
			},
		);

		if (!res.ok) {
			const txt = await res.text();

			// Handle other specific Strapi errors
			if (res.status === 401) {
				return NextResponse.json(
					{
						error: "Authentication failed",
						message:
							"Unable to connect to content management system. Please try again later.",
						details: txt,
					},
					{ status: 503 },
				);
			}

			if (res.status === 404) {
				return NextResponse.json(
					{
						error: "Article not found",
						message: `The article "${slug}" could not be found.`,
						details: txt,
					},
					{ status: 404 },
				);
			}

			if (res.status >= 500) {
				return NextResponse.json(
					{
						error: "Server error",
						message:
							"Content management system is temporarily unavailable. Please try again later.",
						details: txt,
					},
					{ status: 503 },
				);
			}

			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to fetch article from content management system",
					details: txt,
				},
				{ status: res.status },
			);
		}

		const json = await res.json();

		// Strapi returns array of articles, get the first one (should be only one with slug filter)
		const article = json?.data?.[0];

		// If no article found, return 404
		if (!article) {
			return NextResponse.json({ data: null }, { status: 404 });
		}

		// Return the article object (not array)
		return NextResponse.json({ data: article }, { status: 200 });
	} catch (err: unknown) {
		return NextResponse.json(
			{ error: "Server error", message: (err as Error)?.message },
			{ status: 500 },
		);
	}
}
