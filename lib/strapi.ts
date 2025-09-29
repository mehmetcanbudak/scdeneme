const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

function withBaseUrl(path) {
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function buildQuery(params) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) search.append(k, String(v));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export function getStrapiMediaUrl(media) {
  const url = media?.data?.attributes?.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${API_URL}${url}`;
}

export async function getArticles({ page = 1, pageSize = 12 } = {}) {
  const qs = buildQuery({
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
  });
  // Using the public endpoint to avoid depending on role permissions
  const res = await fetch(withBaseUrl(`/api/articles/public${qs}`));
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

export async function getArticleBySlug(slug) {
  const res = await fetch(withBaseUrl(`/api/articles/slug/${encodeURIComponent(slug)}`));
  if (!res.ok) return null;
  const json = await res.json();
  // Public slug endpoint returns a single entity shape
  return json?.data ? json : { data: null };
}
