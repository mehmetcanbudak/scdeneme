# Blog List Fix - Summary

## Problem Identified

The blog list was not showing on the homepage and `/blog` page due to **two main issues**:

1. **Server-Side Rendering Issue**: The `cachedGet()` function in `lib/strapi.ts` used relative URLs (`/api/blog/articles`) which don't work during server-side rendering (SSR). Relative URLs need a base URL context that only exists in the browser.

2. **Strapi API Authentication**: The Strapi `/api/articles` endpoint returns **403 Forbidden** without proper authentication. Individual articles work (like `/blog/organik`) because Strapi likely has `findOne` permission set to public, but the `find` (list) permission is restricted.

## Changes Made

### 1. Fixed `lib/strapi.ts` - Server-Side URL Handling
**File**: `lib/strapi.ts`

Updated the `cachedGet()` function to detect server vs. client context and build absolute URLs for server-side requests:

```typescript
// Build absolute URL for server-side requests
let fetchUrl = url;
if (typeof window === "undefined" && url.startsWith("/")) {
    // Server-side: need absolute URL
    const baseUrl =
        process.env.NEXTAUTH_URL ||
        process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000";
    fetchUrl = `${baseUrl}${url}`;
}
```

### 2. Updated Blog Page - Consistent API Usage
**File**: `app/blog/page.tsx`

Changed server-side fetching to use the Next.js API route instead of directly calling Strapi, ensuring consistency between server and client:

```typescript
// Use Next.js API route for consistency
const baseUrl = /* ... */;
const res = await fetch(`${baseUrl}/api/blog/articles?${qs.toString()}`);
```

### 3. Added Authentication Support to API Routes
**Files**: 
- `app/api/blog/articles/route.ts`
- `app/api/blog/articles/[slug]/route.ts`

Added support for optional Bearer token authentication:

```typescript
const TOKEN = process.env.STRAPI_API_TOKEN;

const headers: HeadersInit = {
    "Content-Type": "application/json",
};
if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`;
}
```

### 4. Improved Error Messages
Added helpful error messages that guide you to the solution:

- **401 Unauthorized**: Tells you if the token is missing or invalid
- **403 Forbidden**: Provides instructions to either set a token or enable public access in Strapi

### 5. Added Type Safety
Fixed TypeScript type annotations in `lib/strapi.ts` to eliminate implicit `any` errors.

## How to Fix (Choose One Option)

### Option 1: Enable Public Access in Strapi (Easiest)

Since individual articles already work, you probably just need to enable the list permission:

1. Log in to Strapi admin: https://dynamic-spirit-b1c4404b11.strapiapp.com/admin
2. Go to: **Settings → Users & Permissions Plugin → Roles → Public**
3. Scroll to **Article** permissions
4. Check: ✅ **find** (to list articles)
5. Make sure ✅ **findOne** is also checked (should already be)
6. Click **Save**
7. Restart your dev server: `pnpm dev`

### Option 2: Use API Token (More Secure)

If you want to keep articles private and use authentication:

1. Log in to Strapi admin
2. Go to: **Settings → API Tokens**
3. Click: **Create new API Token**
4. Set:
   - Name: "Frontend Read Token"
   - Token type: "Read-only"
   - Permissions: Check **Article: find, findOne**
5. Copy the generated token
6. Create `.env.local` in your project root:
   ```bash
   STRAPI_API_TOKEN=paste_your_token_here
   ```
7. Restart your dev server: `pnpm dev`

## Testing

After applying the fix, test these URLs:

1. **Homepage**: http://localhost:3000
   - Should show blog carousel with articles

2. **Blog List**: http://localhost:3000/blog
   - Should show all articles in a grid

3. **Individual Article**: http://localhost:3000/blog/organik
   - Should work as before

## Verification Commands

Check if the API is working:

```bash
# Test the API route (should return JSON with articles)
curl 'http://localhost:3000/api/blog/articles?page=1&pageSize=3'

# If you get an error, check the error message for specific instructions
```

## Troubleshooting

### Still seeing empty blog list?

1. **Check dev server logs** for error messages
2. **Open browser console** (F12) and look for errors
3. **Test API directly**:
   ```bash
   curl -I 'https://dynamic-spirit-b1c4404b11.strapiapp.com/api/articles'
   ```
   - If you see `403 Forbidden`, follow Option 1 or 2 above

### Articles show on page load but disappear?

This means server-side rendering works but client-side doesn't. Check browser console for errors.

### Getting "fetch failed" error?

1. Make sure Strapi server is running
2. Check if you can access: https://dynamic-spirit-b1c4404b11.strapiapp.com
3. Verify your internet connection

## Summary

✅ **Fixed server-side rendering** - API calls now work during SSR  
✅ **Added authentication support** - Can use API tokens if needed  
✅ **Improved error messages** - Clear guidance when something goes wrong  
✅ **Standardized API usage** - Consistent between homepage, blog page, and individual articles  

**Next Step**: Choose Option 1 (public access) or Option 2 (API token) above and test!

For detailed Strapi configuration instructions, see: **BLOG_API_SETUP.md**
