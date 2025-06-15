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

      const { data: group, error: groupError } = await supabase
        .from("staff")
        .select("group(*)")
        .eq("id", user.user.id)
        .single();

      if (groupError || !group) {
        console.error("Error fetching staff group", error);
        redirect("/login");
      }
      const { data: examinations, error: examError } = await supabase.rpc(
        "get_staff_joint_examinations",
        { p_staff_id: user.user.id },
      );
      return { examinations, examError, group };
    },
    [],
    {
      tags: ["staff_joints"],
      revalidate: 60,
    },
  );

  const { examinations, group, examError } = await getJoints();

  if (examError) {
    console.error("Error fetching examinations", examError);
  }

  return (
    <>
      <div className="mt-[90px] flex justify-between">
        <span className="text-2xl">Examinations</span>
        {group && group.group?.name !== "TEACHER" && <JointForm />}
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
