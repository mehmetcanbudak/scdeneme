import { NextResponse } from "next/server";

export async function GET() {
	try {
		// For now, return empty tags array since tags may not exist in Strapi
		// This prevents the authentication error in ProductProvider
		return NextResponse.json(
			{
				data: [],
				meta: {
					pagination: {
						page: 1,
						pageSize: 25,
						pageCount: 0,
						total: 0,
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
