import { createClient } from "@/supabase/server";
import React from "react";
import { Tables } from "@/supabase/supabase-types";
import { StudentClientTable } from "./student-client-table";
import StudentForm from "@/components/forms/student-form";
import { unstable_cache } from "next/cache";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();
  const { id } = await params;

  const pageActions = unstable_cache(
    async () => {
      const { data, error } = await supabase
        .from("student_joint")
        .select("*, student(*)")
        .eq("joint", Number(id))
        .order("created_at", { ascending: false });

      if (!data || error) {
        throw new Error("Failed to fetch students");
      }

      const { data: subjects, error: subjectError } = await supabase
        .from("subject")
        .select("*")
        .eq("joint", Number(id))
        .order("name", { ascending: false });

      if (!subjects || subjectError) {
        throw new Error("Failed to fetch subjects");
      }

      const students = data.map((item) => item.student as Tables<"students">);
      const { data: enlistments, error: enlistmentError } = await supabase
        .from("student_subjects")
        .select("*")
        .in(
          "student",
          students.map((s) => s.id),
        )
        .in(
          "subject",
          subjects.map((s) => s.id),
        );

      if (enlistmentError) {
        console.error("Error fetching enlistments:", enlistmentError);

        throw new Error("Failed to fetch student enlistments");
      }

      const enlistedKeys =
        enlistments?.map((e) => `${e.student}_${e.subject}`) || [];

      return { students, enlistedKeys, subjects };
    },
    [],
    { tags: ["student_assign"], revalidate: 60 },
  );

  const { students, enlistedKeys, subjects } = await pageActions();

  const enlistedStudentsSubjects = new Set(enlistedKeys);

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 md:px-8 md:py-4">
      <div className="flex justify-between">
        <span className="text-3xl font-bold tracking-tight">Students</span>
        <div>
          <StudentForm />
        </div>
      </div>
      <div>
        <StudentClientTable
          studentsData={students}
          subjectsData={subjects}
          enlistedStudentsSubjects={enlistedStudentsSubjects}
        />
      </div>
    </div>
  );
};

export default Page;
