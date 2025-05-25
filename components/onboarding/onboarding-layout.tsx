import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
  title: string;
  description: string;
}

export function OnboardingLayout({
  children,
  step,
  totalSteps,
  title,
  description,
}: OnboardingLayoutProps) {
  return (
    <div className="from-background to-secondary/10 dark:from-background dark:to-secondary/20 relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4 md:p-8">
      {/* Logo and Branding */}
      <div className="mb-6 text-center">
        <h1 className="text-primary text-3xl font-bold">Nexus</h1>
        <p className="text-muted-foreground text-sm">
          Joint Examination Management System
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6 w-full max-w-md">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            Step {step} of {totalSteps}
          </span>
          <span className="text-muted-foreground text-sm">
            {Math.round((step / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content Header */}
      <div className="mb-6 max-w-md text-center">
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Main Content */}
      <Card className="bg-card/95 dark:bg-card/80 w-full max-w-2xl border-0 shadow-lg backdrop-blur-sm">
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </div>
  );
}
