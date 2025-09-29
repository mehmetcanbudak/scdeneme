# 🚀 Start Local Testing - Google Sign-In

## ✅ Configuration Updated!

Your frontend is now configured to use **local Strapi** at `http://localhost:1337`

## 📋 Next Steps

### Terminal 1 - Start Strapi Backend

```bash
cd /Users/mehmetcanbudak/Projects/Skycorps/strapi
npm run develop
```

**Wait for Strapi to fully start** - you should see:
```
[INFO] ⚡️ Server started on http://localhost:1337
[INFO] 📖 API Documentation: http://localhost:1337/documentation
```

### Terminal 2 - Start Frontend

```bash
cd /Users/mehmetcanbudak/Projects/scdeneme
pnpm dev
```

**Wait for frontend to start** - you should see:
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
```

### Test It!

1. Open browser: **http://localhost:3000/login**
2. You should see:
   - OTP login form
   - "veya" divider
   - **"Continue with Google"** button
3. Click the Google button
4. Sign in with your Google account
5. ✅ You should be logged in!

## 🔍 What to Check

### In Browser Console (F12):
- ✅ "Google Sign-In successful"
- ✅ "User info: {name, email, picture}"
- ✅ POST to `http://localhost:1337/api/auth/google` should return **200**
- ✅ No 405 errors

### In Strapi Console:
Look for:
- ✅ Route registered: `POST /api/auth/google`
- ✅ Log: "New user created via Google" or "User logged in via Google"

## 🐛 If You See Errors

### 405 Method Not Allowed
**Fix:** Restart Strapi
```bash
# Ctrl+C to stop Strapi, then
npm run develop
```

### Connection Refused
**Fix:** Make sure Strapi is running on port 1337
```bash
lsof -i :1337
# Should show node process
```

### Google Origin Error
**Fix:** Add to Google Cloud Console:
1. Go to: https://console.cloud.google.com/
2. Credentials → Edit your OAuth Client
3. Add: `http://localhost:3000`
4. Save and wait 5-10 minutes

## 🎯 Expected Flow

1. User clicks "Continue with Google"
2. Google popup opens
3. User signs in
4. Browser sends token to `http://localhost:1337/api/auth/google`
5. Strapi verifies with Google
6. Strapi creates/finds user
7. Strapi returns JWT token
8. User is logged in! 🎉

## 📝 Switching Back to Production

When you're done testing and want to use production Strapi:

Edit `/Users/mehmetcanbudak/Projects/scdeneme/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://dynamic-spirit-b1c4404b11.strapiapp.com
```

Then restart frontend:
```bash
cd /Users/mehmetcanbudak/Projects/scdeneme
pnpm dev
```

---

**Ready?** Open two terminals and run the commands above! 🚀