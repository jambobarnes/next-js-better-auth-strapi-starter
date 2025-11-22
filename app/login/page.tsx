import { LoginForm } from "@/components/auth/login-form";

interface LoginPageProps {
  searchParams: Promise<{ reset?: string; from?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const showResetSuccess = params.reset === "success";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md space-y-4">
        {showResetSuccess && (
          <div className="rounded-md bg-green-500/15 p-3 text-sm text-green-700 dark:text-green-400 text-center">
            Password reset successful! You can now sign in with your new password.
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
