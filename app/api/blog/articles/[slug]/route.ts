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

		// Build headers with optional authentication
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};
		if (TOKEN) {
			headers.Authorization = `Bearer ${TOKEN}`;
		}

		// Use direct slug endpoint that matches the working Strapi endpoint
		const res = await fetch(
			`${STRAPI_URL}/api/articles/${encodeURIComponent(slug)}/`,
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

		// Direct slug endpoint returns single article data object
		const article = json?.data;

		// If no article found, return 404
		if (!article) {
			return NextResponse.json({ data: null }, { status: 404 });
		}

		// Return the article object directly
		return NextResponse.json({ data: article }, { status: 200 });
	} catch (err: unknown) {
		return NextResponse.json(
			{ error: "Server error", message: (err as Error)?.message },
			{ status: 500 },
		);
	}
}
