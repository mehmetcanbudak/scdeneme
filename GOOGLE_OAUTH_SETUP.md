# Google OAuth Setup - Quick Guide

## ✅ Current Status

You're seeing this error:
```
Error 400: origin_mismatch
```

This is **GOOD**! It means:
- ✅ Your app is working
- ✅ Google Sign-In integration is correct
- ❌ Just need to authorize localhost in Google Console

## 🔧 Fix Steps

### 1. Go to Google Cloud Console
https://console.cloud.google.com/

### 2. Navigate to Credentials
- Click ☰ (hamburger menu)
- "APIs & Services" → "Credentials"

### 3. Edit Your OAuth Client
- Find: `856260611184-phk21b3dbp3liohbqb4f56djuv53it3r`
- Click edit icon (✏️)

### 4. Add Authorized JavaScript Origins

Click **"+ ADD URI"** and add:
```
http://localhost:3000
```

⚠️ **Common Mistakes to Avoid:**
- ❌ `https://localhost:3000` (wrong - no https)
- ❌ `localhost:3000` (wrong - missing http://)
- ❌ `http://localhost:3000/` (trailing slash not needed here)
- ✅ `http://localhost:3000` (correct!)

### 5. Add Authorized Redirect URIs

Click **"+ ADD URI"** and add both:
```
http://localhost:3000
http://localhost:3000/
```

### 6. Save
Click **"SAVE"** at the bottom

### 7. Wait 5-10 Minutes
Google needs time to propagate changes to all servers

### 8. Clear Cache & Test
```bash
# Option A: Clear browser cache
Chrome: Cmd+Shift+Delete → Clear cached images and files

# Option B: Use Incognito/Private window
Chrome: Cmd+Shift+N
```

### 9. Test Again
1. Go to: http://localhost:3000/login
2. Click "Continue with Google"
3. Select your account
4. ✅ Should work!

## 🖼️ Visual Guide

Your OAuth settings should look like this:

```
┌─────────────────────────────────────────┐
│ OAuth 2.0 Client IDs                    │
├─────────────────────────────────────────┤
│ Name: [Your App Name]                   │
│ Client ID: 856260611184-...             │
│                                          │
│ Authorized JavaScript origins            │
│ ┌─────────────────────────────────────┐ │
│ │ http://localhost:3000               │ │
│ │ https://yourdomain.com              │ │
│ └─────────────────────────────────────┘ │
│           [+ ADD URI]                    │
│                                          │
│ Authorized redirect URIs                 │
│ ┌─────────────────────────────────────┐ │
│ │ http://localhost:3000               │ │
│ │ http://localhost:3000/              │ │
│ │ https://yourdomain.com/auth/...     │ │
│ └─────────────────────────────────────┘ │
│           [+ ADD URI]                    │
│                                          │
│           [SAVE]    [CANCEL]             │
└─────────────────────────────────────────┘
```

## ⏱️ Verification Script

After waiting 5-10 minutes, run this to verify:

```bash
# Should NOT show origin_mismatch error anymore
# Open in browser and check:
open http://localhost:3000/login
```

## 🎯 Expected Result

**Before Fix:**
```
Error 400: origin_mismatch
Google'ın OAuth 2.0 politikasına uymadığı için...
```

**After Fix:**
```
✅ Google Sign-In popup opens
✅ You can select your account
✅ Redirects back to your app
✅ You're logged in!
```

## 🐛 Troubleshooting

### Still Seeing origin_mismatch?

1. **Wait longer** - Can take up to 10 minutes
2. **Clear browser cache completely**
3. **Use Incognito window**
4. **Verify the origin exactly:** `http://localhost:3000`
5. **Check you saved the changes**

### Can't Find OAuth Client?

Search for:
- Client ID: `856260611184-phk21b3dbp3liohbqb4f56djuv53it3r`
- Or look in the list of "OAuth 2.0 Client IDs"
- Should be under your project

### Wrong Project Selected?

Make sure you're in the correct Google Cloud project:
- Check project name at top of console
- Switch projects if needed

## 📋 Checklist

Before testing again:

- [ ] Added `http://localhost:3000` to Authorized JavaScript origins
- [ ] Added redirect URIs (optional but recommended)
- [ ] Clicked SAVE
- [ ] Waited 5-10 minutes
- [ ] Cleared browser cache OR using Incognito
- [ ] Both Strapi and Frontend are running
- [ ] Frontend is on http://localhost:3000
- [ ] Strapi is on http://localhost:1337

## ✨ After It Works

Once Google login works locally, you can:

1. **Add Production URLs** to the same OAuth client:
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`

2. **Deploy your backend changes** with the Google auth route

3. **Update frontend** `.env.local` back to production:
   ```env
   NEXT_PUBLIC_API_URL=https://dynamic-spirit-b1c4404b11.strapiapp.com
   ```

4. **Test in production** with real users!

---

**Go add localhost to Google Console now!** Then wait 5-10 minutes and test again. 🚀