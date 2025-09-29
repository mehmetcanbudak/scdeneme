# Blog API Setup Guide

## Issue Fixed
The blog list wasn't showing because the Strapi API requires authentication. The following changes have been made:

### Changes Made

1. **Fixed server-side API calls** (`lib/strapi.ts`)
   - Updated `cachedGet()` function to work with both client and server-side requests
   - Now properly builds absolute URLs for server-side requests

2. **Updated API routes** 
   - `/api/blog/articles/route.ts` - List articles endpoint
   - `/api/blog/articles/[slug]/route.ts` - Single article endpoint
   - Both now support optional Bearer token authentication

3. **Standardized blog page** (`app/blog/page.tsx`)
   - Now uses Next.js API routes for consistency
   - Works properly with server-side rendering

## Required: Set Up Strapi API Token

To make the blog work, you need to add your Strapi API token:

### Option 1: Environment Variable (Recommended)

Create a `.env.local` file in the project root with:

```bash
STRAPI_API_TOKEN=your-strapi-api-token-here
```

### Option 2: Add to next.config.mjs

Add to the `env` section in `next.config.mjs`:

```javascript
env: {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://dynamic-spirit-b1c4404b11.strapiapp.com",
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN || "your-token-here",
},
```

### How to Get Your Strapi API Token

1. Log in to your Strapi admin panel at: https://dynamic-spirit-b1c4404b11.strapiapp.com/admin
2. Go to Settings → API Tokens
3. Create a new API Token with "Read" permissions for:
   - Article (find, findOne)
4. Copy the token and add it to your `.env.local` file

## Alternative: Make Articles Public in Strapi

If you don't want to use authentication, you can make the articles collection public in Strapi:

1. Log in to Strapi admin
2. Go to Settings → Users & Permissions Plugin → Roles → Public
3. Check the permissions for Article:
   - ✓ find
   - ✓ findOne
4. Save

## Testing

After adding the token, restart your dev server:

```bash
pnpm dev
```

Then test:
- Homepage: http://localhost:3000 (should show blog carousel)
- Blog page: http://localhost:3000/blog (should show blog list)
- Individual article: http://localhost:3000/blog/organik (should work as before)

## Troubleshooting

If the blog still doesn't work:

1. **Check the token is loaded:**
   ```bash
   # In your terminal
   echo $STRAPI_API_TOKEN
   ```

2. **Check API response:**
   ```bash
   curl 'http://localhost:3000/api/blog/articles?page=1&pageSize=3'
   ```

3. **Check Strapi directly:**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     'https://dynamic-spirit-b1c4404b11.strapiapp.com/api/articles?pagination[page]=1&pagination[pageSize]=2&populate[0]=cover'
   ```

If you see 403 Forbidden, your token is invalid or doesn't have the right permissions.
