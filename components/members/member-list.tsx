"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MemberList = () => {
  const [members, setMembers] = useState<
    { name: string; role: string; department: string; contact: string }[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setMembers([
        {
          name: "John Doe",
          role: "Teacher",
          department: "Math",
          contact: "john.doe@example.com",
        },
        {
          name: "Jane Smith",
          role: "Principal",
          department: "Administration",
          contact: "jane.smith@example.com",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {members?.map(
        (
          member: {
            name: string;
            role: string;
            department: string;
            contact: string;
          },
          index: number,
        ) => (
          <div key={index} className="rounded-md border p-4">
            <h2 className="text-lg font-semibold">{member.name}</h2>
            <p>Role: {member.role}</p>
            <p>Department: {member.department}</p>
            <p>Contact: {member.contact}</p>
          </div>
        ),
      )}
    </div>
  );
};

export default MemberList;
