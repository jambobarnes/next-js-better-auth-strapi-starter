import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LogoutButton } from "./logout-button";

export async function AuthHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">PoP Manager</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {session.user.email}
          </span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
