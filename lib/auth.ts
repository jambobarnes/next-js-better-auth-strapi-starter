import { betterAuth } from "better-auth";
import { credentials } from "better-auth-credentials-plugin";

const appBaseURL = process.env.NEXT_PUBLIC_APP_URL;
const strapiBaseURL = process.env.STRAPI_URL;

if (!appBaseURL) {
  throw new Error("NEXT_PUBLIC_APP_URL is not set");
}

if (!strapiBaseURL) {
  throw new Error("STRAPI_URL is not set");
}

type StrapiAuthResponse = {
  jwt: string;
  user: {
    id: number | string;
    email: string;
    username?: string | null;
  };
};

export const auth = betterAuth({
  baseURL: appBaseURL,
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    credentials({
      autoSignUp: true,
      linkAccountIfExisting: true,
      async callback(_ctx, parsed) {
        const email = parsed.email?.toLowerCase();
        const password = parsed.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const res = await fetch(`${strapiBaseURL}/api/auth/local`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: email,
            password,
          }),
        });

        if (!res.ok) {
          throw new Error("Invalid credentials");
        }

        const data = (await res.json()) as StrapiAuthResponse;
        const { jwt, user } = data;

        if (!jwt || !user?.id) {
          throw new Error("Invalid Strapi response");
        }

        return {
          email: user.email,
          name: user.username ?? user.email,
        };
      },
    }),
  ],
});
