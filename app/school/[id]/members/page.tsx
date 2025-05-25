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

const MembersPage = async ({ params }: { params: { id: string } }) => {
  const supabase = await createClient();
  const { id: schoolId } = await params;

  const { data: staffMembers, error } = await supabase.functions.invoke(
    "retrieve-staff-from-school",
    { body: { schoolId } },
  );

  console.log("Staff members:", staffMembers);

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
            {staffMembers?.map((member: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-2">
                  <Image
                    src={member.staff.image_url}
                    alt={member.staff.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell className="px-4 py-2">{member.staff.name}</TableCell>
                <TableCell className="px-4 py-2">
                  {member.staff.gender.charAt(0).toUpperCase() +
                    member.staff.gender.slice(1)}
                </TableCell>
                <TableCell className="px-4 py-2">{member.group}</TableCell>
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
