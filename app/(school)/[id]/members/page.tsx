import React from "react";
import InviteMembers from "@/components/members/invite-members";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/supabase/server";
import Image from "next/image";
import { avatar } from "@/lib/avatar";
import { unstable_cache } from "next/cache";

const MembersPage = async ({ params }: { params: { id: string } }) => {
  const supabase = await createClient();
  const { id: schoolId } = await params;
  const getStaff = unstable_cache(
    async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*, group(*)")
        .eq("school", schoolId);

      return { data, error };
    },
    [],
    {
      tags: ["staff-members"],
      revalidate: 120,
    },
  );

  const { data, error } = await getStaff();

  if (error) {
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
          <InviteMembers />
        </div>
        <Table className="table-auto border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2">Image</TableHead>
              <TableHead className="px-4 py-2">Name</TableHead>
              <TableHead className="px-4 py-2">Gender</TableHead>
              <TableHead className="px-4 py-2">Role</TableHead>
              <TableHead className="px-4 py-2">Subject</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((member, index: number) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-2">
                  <Image
                    src={avatar({
                      gender: member.gender,
                      first_name: member.first_name,
                      last_name: member.last_name,
                    })}
                    alt={member.first_name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell className="px-4 py-2">
                  {member.first_name} {member.middle_name} {member.last_name}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {member.gender.charAt(0).toUpperCase() +
                    member.gender.slice(1)}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {member.group?.name}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {member.subject || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersPage;
