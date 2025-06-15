import React from "react";
import InviteMembers from "@/components/members/invite-members";
import { createClient } from "@/supabase/server";
import { unstable_cache } from "next/cache";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getStaff as getUser } from "@/lib/get-staff";

const MembersPage = async ({ params }: { params: { id: string } }) => {
  const supabase = await createClient();
  const { id: schoolId } = await params;
  const getStaff = unstable_cache(
    async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*, group(*), subject(*)")
        .eq("school", schoolId);

      return { data, error };
    },
    [],
    {
      tags: ["staff-members"],
      revalidate: 60,
    },
  );

  const { data, error } = await getStaff();

  const { staff, error: staffError } = await getUser();

  if (error || staffError || !staff) {
    console.error("Error fetching staff members:", error);
    return (
      <div className="mt-[90px] space-y-6">
        <h1 className="text-2xl font-bold">Error loading staff members</h1>
      </div>
    );
  }

  return (
    <div className="mt-[90px] flex justify-center space-y-6">
      <div className="w-full max-w-6xl">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">School Members</h1>
          {staff.group && staff.group.name !== "TEACHER" && <InviteMembers />}
        </div>
        {data && <DataTable columns={columns} data={data as any} />}
      </div>
    </div>
  );
};

export default MembersPage;
