import JointCard from "@/components/cards/joint-card";

import { createClient } from "@/supabase/server";

import React from "react";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import JointForm from "@/components/forms/joint-form";

const Page = async () => {
  const supabase = await createClient();

  const getJoints = unstable_cache(
    async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (!user.user || error) {
        redirect("/login");
      }
      const { data: examinations, error: examError } = await supabase.rpc(
        "get_staff_joint_examinations",
        { p_staff_id: user.user.id },
      );
      return { examinations, examError };
    },
    [],
    {
      tags: ["staff_joints"],
      revalidate: 120,
    },
  );

  const { examinations, examError } = await getJoints();

  if (examError) {
    console.error("Error fetching examinations", examError);
  }

  return (
    <>
      <div className="mt-[90px] flex justify-between">
        <span className="text-2xl">Examinations</span>
        <JointForm />
      </div>
      <div className="grid grid-cols-1 gap-5 px-1 lg:grid-cols-3">
        {examinations &&
          examinations.map((exam) => (
            <JointCard key={exam.joint_id} exam={exam} />
          ))}
      </div>
    </>
  );
};

export default Page;
