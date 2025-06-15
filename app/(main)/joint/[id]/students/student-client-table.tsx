"use client";

import React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Tables } from "@/supabase/supabase-types";
import StudentCheckbox from "@/components/students/student-checkbox";
import { DataTable } from "@/app/(school)/[id]/members/data-table";
import { column } from "./columns"; // Assuming 'column' is the correct export from './columns'
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentClientTableProps {
  studentsData: Tables<"students">[];
  subjectsData: Tables<"subject">[];
  enlistedStudentsSubjects: Set<string>;
}

export function StudentClientTable({
  studentsData,
  subjectsData,
  enlistedStudentsSubjects,
}: StudentClientTableProps) {
  const studentColumns: ColumnDef<Tables<"students">>[] = [
    ...column,
    ...subjectsData.map((subject) => ({
      accessorKey: subject.id.toString(),
      header: () => <div title={subject.name}>{subject.code}</div>,
      cell: ({ row }: { row: Row<Tables<"students">> }) => {
        const studentId = row.original.id;
        const subjectId = subject.id;
        const initialIsEnlisted = enlistedStudentsSubjects.has(
          `${studentId}_${subjectId}`,
        );
        return (
          <StudentCheckbox
            row={row}
            subject={subject}
            initialIsEnlisted={initialIsEnlisted}
          />
        );
      },
      size: 100,
    })),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Tables<"students">> }) => (
        <Button variant={"ghost"} size={"icon"} className="cursor-pointer">
          <Trash2 className="h-4 w-4 cursor-pointer text-red-500" />
        </Button>
      ),
    },
  ];

  return <DataTable columns={studentColumns} data={studentsData} />;
}
