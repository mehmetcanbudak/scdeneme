import { NextResponse } from "next/server";

export async function POST() {
	return NextResponse.json({ revalidated: true }, { status: 200 });
}
