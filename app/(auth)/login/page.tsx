import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data: staffData } = await supabase // Renamed to avoid conflict
      .from("staff")
      .select("school")
      .eq("id", user.id)
      .single();

    if (!staffData?.school) {
      redirect("/onboarding/create-school");
    } else {
      redirect(`/school/${staffData.school}`); // Use renamed variable
    }
  }

  return (
    <div className="from-background to-secondary/10 dark:from-background dark:to-secondary/20 relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4 md:flex-row md:p-8">
      {/* Left side - Branding and information */}
      <div className="mb-8 w-full max-w-md md:mb-0 md:w-1/2 md:pr-8">
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-primary mb-2 text-3xl font-bold md:text-4xl">
            Nexus Exam
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your exams and results seamlessly.
          </p>
        </div>

        <div className="hidden space-y-6 md:block">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="text-primary mt-0.5 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Access Your Exams</h3>
              <p className="text-muted-foreground text-sm">
                View upcoming and past examination schedules and details.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="text-primary mt-0.5 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Track Your Progress</h3>
              <p className="text-muted-foreground text-sm">
                Review your results and performance over time.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="text-primary mt-0.5 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Secure & Easy</h3>
              <p className="text-muted-foreground text-sm">
                Log in securely with your credentials.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full max-w-md md:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
