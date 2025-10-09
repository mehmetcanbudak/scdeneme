import { NextResponse } from "next/server";
import { lexicalToHTML } from "@/lib/lexicalToHtml";

function abs(url: string | null | undefined, base: string): string | null {
	if (!url) return null;
	if (url.startsWith("http")) return url;
	if (url.startsWith("/")) return `${base}${url}`;
	return `${base}/${url}`;
}

function mapProduct(doc: any, base: string) {
	const imageUrl = abs(doc?.image?.url || doc?.image?.url, base);
	const imagesArr = Array.isArray(doc?.images) ? doc.images : [];
	const galleryArr = Array.isArray(doc?.gallery) ? doc.gallery : [];

	return {
		id: doc.id,
		name: doc.name,
		slug: doc.slug,
		product_id: doc.product_id,
		description: doc.description ? lexicalToHTML(doc.description) : undefined,
		short_description: doc.short_description,
		is_active: doc.is_active,
		in_stock: doc.in_stock,
		stock_quantity: doc.stock_quantity,
		price: doc.price,
		sale_price: doc.sale_price,
		currency: doc.currency,
		vat_rate: doc.vat_rate,
		vat_included: doc.vat_included,
		discount_percentage: doc.discount_percentage,
		discount_amount: doc.discount_amount,
		product_type: doc.product_type,
		subscription_enabled: doc.subscription_enabled,
		one_time_purchase_enabled: doc.one_time_purchase_enabled,
		subscription_intervals: doc.subscription_intervals || [],
		sku: doc.sku,
		weight: doc.weight,
		dimensions: doc.dimensions,
		image: imageUrl || undefined,
		images: imagesArr
			.map((m: any) => ({ url: abs(m?.url, base) }))
			.filter((m: any) => !!m.url),
		gallery: galleryArr
			.map((m: any) => ({ url: abs(m?.url, base) }))
			.filter((m: any) => !!m.url),
		categories: Array.isArray(doc.categories)
			? doc.categories.map((c: any) => ({
					id: c.id,
					name: c.name,
					slug: c.slug,
				}))
			: [],
		tags: Array.isArray(doc.tags)
			? doc.tags.map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }))
			: [],
		createdAt: doc.createdAt,
		updatedAt: doc.updatedAt,
	};
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);

		// Support both page/pageSize and Strapi-like pagination[page]
		const page = Number(
			searchParams.get("page") || searchParams.get("pagination[page]") || "1",
		);
		const pageSize = Number(
			searchParams.get("pageSize") ||
				searchParams.get("pagination[pageSize]") ||
				"10",
		);

		const base = process.env.PAYLOAD_API_URL;
		if (!base) {
			return NextResponse.json(
				{ error: "Missing PAYLOAD_API_URL" },
				{ status: 500 },
			);
		}

		const qs = new URLSearchParams();
		qs.set("page", String(page));
		qs.set("limit", String(pageSize));
		qs.set("depth", "1");
		qs.set("sort", "-createdAt");

		const res = await fetch(`${base}/api/products?${qs.toString()}`, {
			cache: "no-store",
			headers: { "Content-Type": "application/json" },
		});

		if (!res.ok) {
			const txt = await res.text();
			return NextResponse.json(
				{
					error: "Upstream error",
					message: "Failed to fetch products from Payload",
					details: txt,
				},
				{ status: res.status },
			);
		}

		const json = await res.json();
		const docs = Array.isArray(json?.docs) ? json.docs : [];
		const data = docs.map((d: any) => mapProduct(d, base));

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
