import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthCodeErrorPage() {
  return (
    <div className="from-background to-secondary/10 dark:from-background dark:to-secondary/20 relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4 md:p-8">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <AlertTriangle className="text-destructive h-16 w-16" />
        </div>
        <h1 className="text-destructive mb-4 text-3xl font-bold md:text-4xl">
          Authentication Code Error
        </h1>
        <p className="text-muted-foreground mb-8">
          There was an issue verifying your authentication code. This could be
          due to an expired or invalid code. Please try again or request a new
          verification email.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Button asChild>
            <Link href="/auth/verify-email">Go Here to Request New Code</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
