import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { Button } from "@/components/ui/button";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <OnboardingLayout
      step={3}
      totalSteps={3}
      title="Setup Complete!"
      description="Your school has been successfully registered"
    >
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="bg-primary/10 dark:bg-primary/20 mb-6 rounded-full p-4">
          <CheckCircle className="text-primary h-16 w-16" />
        </div>

        <h3 className="mb-2 text-2xl font-bold">Welcome to Nexus!</h3>
        <p className="text-muted-foreground mb-8 max-w-md">
          Your school has been successfully registered. You can now start using
          the Nexus platform to manage your examinations.
        </p>

        <Link href="/dashboard" passHref>
          <Button size="lg" className="px-8">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </OnboardingLayout>
  );
}
