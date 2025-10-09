// CMS utilities and cached fetch helpers for internal API routes

// Simple in-memory cache with TTL to avoid repeated requests
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes
const cache = new Map<string, { timestamp: number; data: any }>();
const inflight = new Map<string, Promise<any>>();

function buildQuery(params: Record<string, any>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) search.append(k, String(v));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

async function cachedGet(url: string) {
  const now = Date.now();
  const cached = cache.get(url);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  if (inflight.has(url)) {
    return inflight.get(url)!;
  }

  // Build absolute URL for server-side requests
  let fetchUrl = url;
  if (typeof window === "undefined" && url.startsWith("/")) {
    // Server-side: need absolute URL
    const nextUrl = process.env.NEXTAUTH_URL;
    const vercelUrl = process.env.VERCEL_URL;
    const baseUrl = nextUrl ? nextUrl : vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000";
    fetchUrl = `${baseUrl}${url}`;
  }

  const promise = fetch(fetchUrl)
    .then(async (res) => {
      if (!res.ok) throw new Error(`Failed to fetch: ${fetchUrl}`);
      const data = await res.json();
      cache.set(url, { timestamp: Date.now(), data });
      inflight.delete(url);
      return data;
    })
    .catch((err) => {
      inflight.delete(url);
      throw err;
    });
  inflight.set(url, promise);
  return promise;
}

export function getMediaUrl(media: any) {
  if (!media) return null;
  const url = media?.url ?? media?.data?.attributes?.url;
  if (!url) return null;
  return url;
}

export async function getArticles({
  page = 1,
  pageSize = 12,
  preview,
}: {
  page?: number;
  pageSize?: number;
  preview?: boolean;
} = {}) {
  const isDev = process.env.NODE_ENV !== "production";
  const qs = buildQuery({
    page,
    pageSize,
    preview: (preview ?? isDev) ? 1 : undefined,
  });
  // Use internal proxy route to keep tokens server-side
  const url = `/api/blog/articles${qs}`;
  return cachedGet(url);
}

export async function getArticleBySlug(slug: string) {
  const url = `/api/blog/articles/${encodeURIComponent(slug)}`;
  const json = await cachedGet(url);
  return json?.data ? json : { data: null };
}
