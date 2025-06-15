"use client";
import React, { useState } from "react"; // No need for useEffect for initial fetch
import { Checkbox } from "@/components/ui/checkbox";
import { Row } from "@tanstack/react-table";
import { Tables } from "@/supabase/supabase-types";
import { createClient } from "@/supabase/client";
import { revalidateAction } from "@/app/(school)/[id]/actions";

interface StudentCheckboxProps {
  row: Row<Tables<"students">>;
  subject: Tables<"subject">;
  initialIsEnlisted: boolean; // Now this prop directly provides the initial state
}

const StudentCheckbox = ({
  row,
  subject,
  initialIsEnlisted,
}: StudentCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(initialIsEnlisted); // Initialize with prop
  const supabase = createClient();

  // No useEffect for initial data fetching needed here anymore!

  const handleCheckedChange = async (checked: boolean) => {
    setIsChecked(checked); // Optimistically update UI
    if (checked) {
      const { error } = await supabase.from("student_subjects").insert({
        student: row.original.id,
        subject: subject.id,
      });
      revalidateAction("student_assign");
      if (error) {
        console.error("Error enlisting student:", error);
        setIsChecked(!checked);
      }
    } else {
      const { error } = await supabase
        .from("student_subjects")
        .delete()
        .eq("student_id", row.original.id)
        .eq("subject_id", subject.id);
      revalidateAction("student_assign");
      if (error) {
        console.error("Error unenlisting student:", error);
        setIsChecked(!checked);
      }
    }
  };

  return <Checkbox checked={isChecked} onCheckedChange={handleCheckedChange} />;
};

export default StudentCheckbox;
