const strapiBaseURL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL;

export async function requestPasswordReset(email: string) {
  if (!strapiBaseURL) {
    throw new Error("STRAPI_URL is not configured");
  }

  const res = await fetch(`${strapiBaseURL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to send reset email" }));
    throw new Error(error.message || "Failed to send reset email");
  }

  return res.json();
}

export async function resetPassword(code: string, password: string, passwordConfirmation: string) {
  if (!strapiBaseURL) {
    throw new Error("STRAPI_URL is not configured");
  }

  const res = await fetch(`${strapiBaseURL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      password,
      passwordConfirmation,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to reset password" }));
    throw new Error(error.message || "Failed to reset password");
  }

  return res.json();
}
