import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const page = url.searchParams.get("page") || "1";
		const pageSize = url.searchParams.get("pageSize") || "12";
		const preview = url.searchParams.get("preview") === "1";

		const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;
		const TOKEN = process.env.STRAPI_API_TOKEN;

		if (!STRAPI_URL) {
			return NextResponse.json(
				{ error: "Missing NEXT_PUBLIC_API_URL" },
				{ status: 500 },
			);
		}

		const qs = new URLSearchParams();
		// Populate only existing field(s)
		qs.set("populate[0]", "cover");
		qs.set("sort[0]", "publishedAt:desc");
		qs.set("pagination[page]", page);
		qs.set("pagination[pageSize]", pageSize);
		// Strapi v5: publicationState=preview includes drafts
		qs.set("publicationState", preview ? "preview" : "live");

		// Build headers with optional authentication
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};
		if (TOKEN) {
			headers.Authorization = `Bearer ${TOKEN}`;
		}

		// Use Strapi public articles endpoint (auth: false) to avoid permission issues
		const res = await fetch(`${STRAPI_URL}/api/articles/public?${qs.toString()}`, {
			headers,
			cache: "no-store",
		});

		if (!res.ok) {
			const txt = await res.text();

			// Handle specific Strapi errors
			if (res.status === 401) {
				return NextResponse.json(
					{
						error: "Authentication failed",
						message: TOKEN
							? "Invalid API token. Please check your STRAPI_API_TOKEN environment variable."
							: "API requires authentication. Please set STRAPI_API_TOKEN environment variable.",
						details: txt,
					},
					{ status: 503 },
				);
			}

			if (res.status === 403) {
				return NextResponse.json(
					{
						error: "Access forbidden",
						message: TOKEN
							? "API token doesn't have sufficient permissions. Please enable 'find' permission for Articles in Strapi admin."
							: "Articles endpoint requires authentication or public access. Please either set STRAPI_API_TOKEN or enable public 'find' permission in Strapi Settings → Roles → Public → Article.",
						details: txt,
						helpUrl: "See BLOG_API_SETUP.md for detailed instructions",
					},
					{ status: 503 },
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
					message: "Failed to fetch articles from content management system",
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
