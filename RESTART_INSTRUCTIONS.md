# 🔄 Complete Restart Instructions

## ✅ What I Just Did

1. ✅ Killed all running Next.js dev servers (there were multiple!)
2. ✅ Your `.env.local` is correctly configured for local Strapi
3. ✅ Backend code has Google auth route ready

## 🚀 Start Fresh - Follow These Steps

### Step 1: Start Strapi Backend

Open **Terminal 1**:
```bash
cd /Users/mehmetcanbudak/Projects/Skycorps/strapi
npm run develop
```

**Wait for this message:**
```
[INFO] ⚡️ Server started on http://localhost:1337
```

You should also see routes being registered, including:
```
[INFO] POST /api/auth/google
```

### Step 2: Start Frontend (Clean Start)

Open **Terminal 2**:
```bash
cd /Users/mehmetcanbudak/Projects/scdeneme

# Clean any cached files first
rm -rf .next

# Start fresh
pnpm dev
```

**Wait for:**
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
✓ Compiled in XXms
```

### Step 3: Test Google Login

1. Open browser: **http://localhost:3000/login**
2. Open Browser Console (F12 or Cmd+Option+I)
3. Click **"Continue with Google"**
4. Sign in with your Google account

### Step 4: Check Console Output

**Browser Console should show:**
```
✅ Google Sign-In successful
✅ User info: {name, email, picture}
✅ POST http://localhost:1337/api/auth/google 200 OK
```

**NOT:**
```
❌ POST https://dynamic-spirit-b1c4404b11.strapiapp.com/...
```

If you still see the production URL, the frontend didn't pick up the new env variable. Try:
```bash
# Ctrl+C to stop, then
rm -rf .next
pnpm dev
```

## 🐛 Known Issues to Fix

### Issue 1: Google Origin Error

You're seeing:
```
[GSI_LOGGER]: The given origin is not allowed for the given client ID
```

**Fix this in Google Cloud Console:**

1. Go to: https://console.cloud.google.com/
2. Click on "APIs & Services" → "Credentials"
3. Find your OAuth 2.0 Client ID: `856260611184-phk21b3dbp3liohbqb4f56djuv53it3r`
4. Click the edit icon (pencil)
5. Under **"Authorized JavaScript origins"**, add:
   ```
   http://localhost:3000
   ```
   ⚠️ **IMPORTANT:** Include `http://` - not just `localhost:3000`

6. Under **"Authorized redirect URIs"**, add:
   ```
   http://localhost:3000
   http://localhost:3000/
   ```

7. Click **Save**
8. **Wait 5-10 minutes** for changes to propagate to Google's servers
9. Clear browser cache or use Incognito window
10. Try again

### Issue 2: CORS Warnings

The warnings:
```
Cross-Origin-Opener-Policy policy would block the window.postMessage call
```

These are **just warnings** from Google's security, not errors. They won't prevent login from working once the origin is properly configured.

## 🎯 Expected Successful Flow

1. Click "Continue with Google"
2. Google popup opens (may show warnings but still works)
3. Select your Google account
4. Console: "Google Sign-In successful"
5. Console: "User info: {...}"
6. Request to: `http://localhost:1337/api/auth/google`
7. Response: 200 OK with JWT token
8. Redirected to home page
9. You're logged in! ✅

## 📋 Verification Checklist

Before testing, verify:

- [ ] Strapi is running on port 1337
  ```bash
  curl http://localhost:1337/api/auth/me
  # Should return 401, not connection error
  ```

- [ ] Frontend is using local URL
  ```bash
  cat /Users/mehmetcanbudak/Projects/scdeneme/.env.local
  # Should show: NEXT_PUBLIC_API_URL=http://localhost:1337
  ```

- [ ] No other Next.js processes running
  ```bash
  ps aux | grep "next dev" | grep -v grep
  # Should return nothing
  ```

- [ ] Google Client ID matches in both places
  ```bash
  # Frontend
  grep GOOGLE_CLIENT_ID /Users/mehmetcanbudak/Projects/scdeneme/.env.local
  
  # Backend
  grep GOOGLE_CLIENT_ID /Users/mehmetcanbudak/Projects/Skycorps/strapi/.env
  
  # Both should show: 856260611184-phk21b3dbp3liohbqb4f56djuv53it3r
  ```

## 💡 Pro Tips

1. **Always restart frontend after `.env.local` changes**
   - Next.js caches environment variables
   - Use `rm -rf .next` to clear cache

2. **Use different terminals for frontend/backend**
   - Makes it easier to see logs
   - Can restart one without affecting the other

3. **Keep browser console open**
   - See errors immediately
   - Watch network requests

4. **Test with Incognito window**
   - Avoids cache issues
   - Cleaner test environment

## 🆘 Still Having Issues?

If after following all steps you still see errors:

1. **Share these logs:**
   - Browser console errors
   - Network tab request/response
   - Strapi console output

2. **Verify environment:**
   ```bash
   # Show me these outputs:
   cat /Users/mehmetcanbudak/Projects/scdeneme/.env.local
   curl -X POST http://localhost:1337/api/auth/google -H "Content-Type: application/json" -d '{"idToken":"test"}' -v
   ```

---

**Ready?** Start with Terminal 1 (Strapi), then Terminal 2 (Frontend)! 🚀