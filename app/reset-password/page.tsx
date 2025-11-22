import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { redirect } from "next/navigation";

interface ResetPasswordPageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const code = params.code;

  if (!code) {
    redirect("/forgot-password");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <ResetPasswordForm code={code} />
    </div>
  );
}
