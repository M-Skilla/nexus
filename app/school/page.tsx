import SchoolCard from "@/components/cards/school-card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "@/supabase/server";
import { Plus } from "lucide-react";
import { School } from "@/lib/types";
import React from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import ExampleForm from "@/components/ui/form-builder/example-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import SchoolForm from "@/components/forms/school-form";

const Page = async () => {
  const supabase = createClient();

  // Check if user is logged in
  const { data: user, error } = await (await supabase).auth.getUser();
  if (!user.user || error) {
    toast.error("You are not logged in");
    redirect("/login");
  }

  // Fetch schools for the current staff member with loading state handling
  let isLoading = true;
  let schoolsData: any = null;
  let schoolsError: any = null;

  const schools_for_staff = unstable_cache(
    async () => {
      console.log("schools_for_staff invoked");
      const { data: schoolsData, error: schoolsError } = await (
        await supabase
      ).functions.invoke("retrieve-schools-for-staff");
      return { schoolsData, schoolsError };
    },
    ["schools-for-staff"],
    {
      tags: ["schools-for-staff"],
      revalidate: 24 * 60 * 60,
    },
  );

  try {
    const result = await schools_for_staff();
    schoolsData = result.schoolsData;
    schoolsError = result.schoolsError;
    isLoading = false;
  } catch (error) {
    schoolsError = error;
    isLoading = false;
  }

  if (schoolsError) {
    console.error("Error fetching schools:", schoolsError);
    toast.error("Error fetching schools");
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">
          We couldn't load your schools. Please try again later.
        </p>
      </div>
    );
  }

  const schools = schoolsData as School[];

  // Render skeleton cards while loading
  const SchoolSkeletons = () => (
    <div className="mt-6 grid grid-cols-1 gap-5 px-1 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="rounded-lg border p-4">
          <Skeleton className="mb-4 h-8 w-3/4" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="mt-[90px] flex justify-between">
        <span className="text-2xl font-semibold">Your Schools</span>
        <Sheet>
          <SheetTrigger className="bg-primary/70 flex cursor-pointer items-center gap-2 rounded-[10px] px-4 py-2 text-sm">
            <Plus className="h-4 w-4" /> <span>Add School</span>
          </SheetTrigger>
          <SheetContent className="max-w-[600px]">
            <ScrollArea className="h-full w-full">
              <SheetHeader>
                <SheetTitle>Add a New School</SheetTitle>
                <SheetDescription>
                  Fill out the form to add a new school to your account.
                </SheetDescription>
              </SheetHeader>
              <div className="p-4">
                <SchoolForm />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {isLoading ? (
        <SchoolSkeletons />
      ) : schools && schools.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 px-1 md:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => (
            <Link href={`/school/${school.school.id}`} key={school.school.id}>
              <SchoolCard school={school.school} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex min-h-[40vh] flex-col items-center justify-center">
          <h3 className="mb-3 text-xl font-medium">No Schools Found</h3>
          <p className="text-muted-foreground mb-6">
            You don't have access to any schools yet.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Your First School
          </Button>
        </div>
      )}
    </>
  );
};

export default Page;
