import JointCard from "@/components/cards/joint-card";
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
import React from "react";
import SchoolIdClientSaver from "@/components/schools/school-id-client-saver";
import { unstable_cache } from "next/cache";

const Page = async ({ params }: { params: { id: string } }) => {
  const supabase = await createClient();
  const { id } = await params;

  const { data: user, error } = await supabase.auth.getUser();
  if (!user.user || error) {
    console.error("You are not logged in");
  }

  const getJoints = async () => {
    console.log("getJoints invoked");
    const { data: examinations, error: examError } = await supabase.rpc(
      "get_joint_fields_by_user",
      { school_id: id },
    );
    return { examinations, examError };
  };

  const { examinations, examError } = await getJoints();

  if (examError) {
    console.error("Error fetching examinations", examError);
  }

  return (
    <>
      {/* Client component to save school ID to localStorage and cookie */}
      <SchoolIdClientSaver schoolId={id} />

      <div className="mt-[90px] flex justify-between">
        <span className="text-2xl">Examinations</span>
        <Sheet>
          <SheetTrigger className="bg-primary/70 flex cursor-pointer items-center gap-2 rounded-[10px] px-1 py-2 text-sm">
            <Plus className="h-4 w-4" /> <span>Add Examination</span>{" "}
          </SheetTrigger>
          <SheetContent className="max-w-[600px]">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 gap-5 px-1 lg:grid-cols-3">
        {examinations &&
          examinations.map((exam) => <JointCard key={exam.id} exam={exam} />)}
      </div>
    </>
  );
};

export default Page;
