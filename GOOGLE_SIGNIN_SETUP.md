# Google Sign-In Setup Guide

This guide will help you configure Google Sign-In for your SkyCrops application.

## Frontend Setup

### 1. Get Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Identity** services:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Add authorized JavaScript origins:
     - For development: `http://localhost:3000`
     - For production: `https://yourdomain.com`
   - Add authorized redirect URIs (if needed):
     - `http://localhost:3000`
     - `https://yourdomain.com`
   - Click "Create"

5. Copy the **Client ID** (it looks like: `123456789-abcdefg.apps.googleusercontent.com`)

### 2. Configure Environment Variables

1. Create a `.env.local` file in the project root (if it doesn't exist)
2. Add the following variable:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
```

**Note:** Replace `your_actual_client_id_here` with your actual Google Client ID.

### 3. Test the Integration

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to the login page: `http://localhost:3000/login`

3. You should see:
   - The existing OTP login form at the top
   - A divider with "veya" (or)
   - The Google "Continue with Google" button at the bottom

4. Click the Google button and test the sign-in flow

## Backend Setup (Strapi)

You'll need to create an endpoint in your Strapi backend to handle Google authentication.

### 1. Install Google Auth Library

In your Strapi project directory:

```bash
cd /Users/mehmetcanbudak/Projects/Skycorps/strapi
npm install google-auth-library
```

### 2. Create Custom Route

Create a new file: `src/api/auth/routes/custom-auth.js`

```javascript
module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/google',
      handler: 'custom-auth.googleLogin',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
```

### 3. Create Controller

Create a new file: `src/api/auth/controllers/custom-auth.js`

```javascript
const { OAuth2Client } = require('google-auth-library');

module.exports = {
  async googleLogin(ctx) {
    try {
      const { idToken } = ctx.request.body;

      if (!idToken) {
        return ctx.badRequest('ID token is required');
      }

      // Initialize Google OAuth2 client
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { email, name, sub: googleId, picture, given_name, family_name } = payload;

      // Check if user exists by email
      let user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email },
      });

      // Create user if doesn't exist
      if (!user) {
        // Get the authenticated role
        const authenticatedRole = await strapi
          .query('plugin::users-permissions.role')
          .findOne({ where: { type: 'authenticated' } });

        if (!authenticatedRole) {
          return ctx.badRequest('Authenticated role not found');
        }

        // Create new user
        user = await strapi.query('plugin::users-permissions.user').create({
          data: {
            username: email.split('@')[0], // Use email prefix as username
            email,
            firstName: given_name || name,
            lastName: family_name || '',
            confirmed: true,
            blocked: false,
            role: authenticatedRole.id,
            provider: 'google',
            // You may want to add a custom field to store Google ID
            // googleId: googleId,
          },
        });
      }

      // Check if user is blocked
      if (user.blocked) {
        return ctx.badRequest('User account is blocked');
      }

      // Generate JWT token
      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
      });

      // Return user data and token
      ctx.send({
        jwt,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone || '',
          phoneVerified: user.phoneVerified || false,
          confirmed: user.confirmed,
          blocked: user.blocked,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        message: 'Google ile giriş başarılı',
      });
    } catch (error) {
      console.error('Google authentication error:', error);
      ctx.badRequest('Google authentication failed', { 
        error: error.message 
      });
    }
  },
};
```

### 4. Configure Strapi Environment

Add to your Strapi `.env` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

**Important:** Use the same Client ID as in your frontend.

### 5. Restart Strapi

```bash
cd /Users/mehmetcanbudak/Projects/Skycorps/strapi
npm run develop
```

## Security Considerations

1. **HTTPS in Production**: Always use HTTPS in production
2. **Authorized Origins**: Only add trusted domains to your Google OAuth authorized origins
3. **Token Verification**: Always verify the Google token on the backend
4. **User Data**: Store minimal user data from Google
5. **Environment Variables**: Never commit `.env` files with real credentials
6. **CORS**: Ensure your backend allows requests from your frontend domain

## Troubleshooting

### Google Button Not Showing

- Check browser console for errors
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly in `.env.local`
- Ensure the Google Sign-In script is loaded (check network tab)
- Restart your development server after adding environment variables

### "Google Client ID not configured" Error

- Make sure you've created a `.env.local` file in the project root
- Verify the environment variable name is exactly: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- The variable must start with `NEXT_PUBLIC_` to be accessible in the browser
- Restart your development server

### "Unauthorized" or CORS Errors

- Add your domain to authorized JavaScript origins in Google Cloud Console
- Make sure the origin includes the protocol (http:// or https://)
- For development, add `http://localhost:3000`
- For production, add your actual domain

### Backend Authentication Fails

- Verify the Google token on the backend using `google-auth-library`
- Check that the `GOOGLE_CLIENT_ID` matches on both frontend and backend
- Ensure the token hasn't expired (Google tokens are short-lived)
- Check Strapi logs for detailed error messages

### User Creation Issues

- Verify that the "authenticated" role exists in Strapi
- Check that your Strapi user model has the required fields
- If you want to store Google ID, add a custom field to the user model

## File Structure

After setup, your project structure should look like:

```
scdeneme/
├── app/
│   └── layout.tsx (with Google script)
├── components/
│   └── auth/
│       ├── google-login-button.tsx (new)
│       └── otp-login-form.tsx (updated)
├── contexts/
│   └── auth-context.tsx (updated)
├── .env.local (create this)
└── GOOGLE_SIGNIN_SETUP.md (this file)

strapi/
├── src/
│   └── api/
│       └── auth/
│           ├── routes/
│           │   └── custom-auth.js (new)
│           └── controllers/
│               └── custom-auth.js (new)
└── .env (update with GOOGLE_CLIENT_ID)
```

## Testing Checklist

- [ ] Google Client ID configured in Google Cloud Console
- [ ] Frontend `.env.local` file created with `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- [ ] Backend `.env` file updated with `GOOGLE_CLIENT_ID`
- [ ] `google-auth-library` installed in Strapi
- [ ] Custom auth route created in Strapi
- [ ] Custom auth controller created in Strapi
- [ ] Development servers restarted
- [ ] Login page shows Google button
- [ ] Clicking Google button opens Google sign-in popup
- [ ] Successful sign-in creates/logs in user
- [ ] JWT token is properly stored
- [ ] User can access protected routes after Google sign-in

## Additional Resources

- [Google Identity Documentation](https://developers.google.com/identity/gsi/web/guides/overview)
- [Strapi Authentication Documentation](https://docs.strapi.io/dev-docs/plugins/users-permissions)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [google-auth-library NPM Package](https://www.npmjs.com/package/google-auth-library)