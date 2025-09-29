# Google Sign-In Troubleshooting

## 🐛 Issues Found and Fixed

### 1. ✅ FIXED: `setError is not defined` Error
**Problem:** The Google login button was trying to call `setError()` which doesn't exist in the component scope.

**Solution:** Updated `/Users/mehmetcanbudak/Projects/scdeneme/components/auth/otp-login-form.tsx` to use console.error instead. The error will be displayed through the auth context's error state.

### 2. ⚠️  TO FIX: 405 Method Not Allowed

**Problem:** Backend route `/api/auth/google` returns 405 error.

**Possible Causes:**
1. Strapi server needs to be restarted
2. Route not properly registered
3. Method mismatch

**Solutions to Try:**

#### A. Restart Strapi Server
```bash
# Kill any existing Strapi process
pkill -f strapi

# Start fresh
cd /Users/mehmetcanbudak/Projects/Skycorps/strapi
npm run develop
```

#### B. Verify Route Registration
Check that the route file exists and is correct:
```bash
cat /Users/mehmetcanbudak/Projects/Skycorps/strapi/src/api/auth/routes/auth.js
```

Look for:
```javascript
{
  method: 'POST',
  path: '/auth/google',
  handler: 'api::auth.auth.googleLogin',
  ...
}
```

#### C. Check Strapi Logs
When Strapi starts, it should log all registered routes. Look for:
```
[2025-xx-xx xx:xx:xx.xxx] info: POST /api/auth/google
```

#### D. Test Route Manually
```bash
curl -X POST http://localhost:1337/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"idToken":"test"}' \
  -v
```

Should return 400 (Invalid token) not 405.

### 3. ⚠️  TO FIX: Google Cloud Console Origin Issues

**Problem:** 
- CORS warnings about `Cross-Origin-Opener-Policy`
- "[GSI_LOGGER]: The given origin is not allowed for the given client ID"

**Solution:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID: `856260611184-phk21b3dbp3liohbqb4f56djuv53it3r`
4. Click Edit (pencil icon)
5. Under **Authorized JavaScript origins**, make sure you have:
   ```
   http://localhost:3000
   ```
   ⚠️ **Important:** Must include `http://` not just `localhost:3000`

6. Under **Authorized redirect URIs**, add (if not exists):
   ```
   http://localhost:3000
   ```

7. Click **Save**
8. Wait 5-10 minutes for changes to propagate
9. Clear browser cache and try again

### 4. Alternative: Check if API URL is Correct

Your frontend is configured to use:
```
NEXT_PUBLIC_API_URL=https://dynamic-spirit-b1c4404b11.strapiapp.com
```

This is the **production** URL. If you're testing locally:

**Option A: Test with Local Strapi**
Update `/Users/mehmetcanbudak/Projects/scdeneme/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_GOOGLE_CLIENT_ID=856260611184-phk21b3dbp3liohbqb4f56djuv53it3r.apps.googleusercontent.com
```

**Option B: Use Production Strapi**
Make sure your production Strapi has:
1. The Google auth route deployed
2. `google-auth-library` installed
3. `GOOGLE_CLIENT_ID` environment variable set

## 🔍 Debugging Steps

### Step 1: Verify Backend is Running
```bash
curl http://localhost:1337/api/auth/me
# Should return 401 (unauthorized) not connection error
```

### Step 2: Check Frontend Environment
```bash
cd /Users/mehmetcanbudak/Projects/scdeneme
cat .env.local
```

Should see:
```
NEXT_PUBLIC_API_URL=http://localhost:1337  # or your Strapi URL
NEXT_PUBLIC_GOOGLE_CLIENT_ID=856260611184-phk21b3dbp3liohbqb4f56djuv53it3r.apps.googleusercontent.com
```

### Step 3: Check Backend Environment
```bash
cd /Users/mehmetcanbudak/Projects/Skycorps/strapi
cat .env | grep GOOGLE
```

Should see:
```
GOOGLE_CLIENT_ID=856260611184-phk21b3dbp3liohbqb4f56djuv53it3r.apps.googleusercontent.com
```

### Step 4: Test Google Button Loads
1. Open browser console
2. Go to: http://localhost:3000/login
3. Check for script loading:
   ```
   Network tab → Filter: gsi → Should see client script loaded
   ```

### Step 5: Check Browser Console Errors
Look for:
- ✅ "Google Sign-In successful" 
- ✅ User info logged
- ❌ 405 error on POST request
- ❌ GSI_LOGGER origin error

## 🚀 Quick Fix Steps

1. **Restart Everything:**
   ```bash
   # Terminal 1 - Kill and restart backend
   pkill -f strapi
   cd /Users/mehmetcanbudak/Projects/Skycorps/strapi
   npm run develop
   
   # Terminal 2 - Restart frontend (Ctrl+C then)
   cd /Users/mehmetcanbudak/Projects/scdeneme
   pnpm dev
   ```

2. **Clear Browser Cache:**
   - Chrome: Cmd+Shift+Delete → Clear cached images and files
   - Or open Incognito window

3. **Test Again:**
   - Go to http://localhost:3000/login
   - Click "Continue with Google"
   - Check console for errors

## 📝 Expected Behavior

When working correctly:
1. User clicks "Continue with Google"
2. Google popup opens (no CORS errors)
3. User selects account
4. Console shows: "Google Sign-In successful"
5. Console shows: "User info: {name, email, picture}"
6. POST request to `/api/auth/google` returns 200
7. User is redirected and logged in

## 🆘 Still Not Working?

Check:
1. ✅ Strapi is running on port 1337
2. ✅ Frontend can reach Strapi
3. ✅ Google Client ID is correct in both places
4. ✅ Google Cloud Console has correct origins
5. ✅ Route file exists in Strapi
6. ✅ `google-auth-library` is installed

If still failing, share:
- Strapi console logs
- Browser console errors
- Network tab request/response details