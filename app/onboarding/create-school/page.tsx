import CreateSchoolForm from "@/components/onboarding/create-school-form";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";

export default function CreateSchoolPage() {
  return (
    <OnboardingLayout
      step={2}
      totalSteps={3}
      title="School Information"
      description="Set up your school profile to get started with Nexus"
    >
      <CreateSchoolForm />
    </OnboardingLayout>
  );
}
