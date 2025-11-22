# Authentication Setup

This application uses **better-auth** with Strapi credentials for authentication.

## Features Implemented

- ✅ User sign-in with email/password (via Strapi)
- ✅ User logout
- ✅ Password reset flow (via Strapi)
- ✅ Protected routes (all pages except login/reset)
- ✅ Middleware-based authentication
- ✅ shadcn/ui components for forms

## Environment Variables

Make sure to set the following in your `.env` file:

```env
# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Strapi
STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
```

**Important:** Generate a secure secret for `BETTER_AUTH_SECRET`:
```bash
openssl rand -base64 32
```

## Routes

### Public Routes (No Authentication Required)
- `/login` - Sign in page
- `/forgot-password` - Request password reset
- `/reset-password?code=xxx` - Reset password with code from email

### Protected Routes (Authentication Required)
- `/` - Home dashboard
- All other routes are protected by default

## How It Works

### Authentication Flow
1. User enters credentials on `/login`
2. Credentials are sent to Strapi's `/api/auth/local` endpoint
3. On success, better-auth creates a session
4. User is redirected to the home page

### Password Reset Flow
1. User requests reset on `/forgot-password`
2. Request sent to Strapi's `/api/auth/forgot-password`
3. Strapi sends email with reset code
4. User clicks link to `/reset-password?code=xxx`
5. New password sent to Strapi's `/api/auth/reset-password`
6. User redirected to login with success message

### Route Protection
- Middleware checks authentication on every request
- Unauthenticated users redirected to `/login`
- Authenticated users accessing `/login` redirected to `/`

## Components

### Auth Components
- `LoginForm` - Email/password sign-in form
- `ForgotPasswordForm` - Request password reset
- `ResetPasswordForm` - Set new password with code
- `LogoutButton` - Sign out button
- `AuthHeader` - Header with user info and logout

### UI Components (shadcn)
- `Button`
- `Input`
- `Label`
- `Card`
- `Form`

## Strapi Configuration

Your Strapi instance must have:
1. Users & Permissions plugin enabled (default)
2. Email provider configured for password reset emails
3. The following endpoints available:
   - `POST /api/auth/local` - Login
   - `POST /api/auth/forgot-password` - Request reset
   - `POST /api/auth/reset-password` - Reset password

## Development

Run the development server:
```bash
npm run dev
```

Make sure your Strapi instance is running and accessible at the URL specified in `STRAPI_URL`.

## Notes

- Sessions are managed by better-auth
- Password reset emails are sent by Strapi
- All authentication state is server-side
- Middleware runs on every request for route protection
