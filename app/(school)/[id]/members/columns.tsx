"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { avatar } from "@/lib/avatar";
import { getStaff } from "@/lib/get-staff";
import { createClient } from "@/supabase/client";
import { Tables } from "@/supabase/supabase-types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Menu, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type Member = {
  created_at: string;
  first_name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  group: number & {
    created_at: string;
    id: number;
    name: string;
  };
  id: string;
  is_owner: boolean;
  last_name: string;
  middle_name: string;
  school: string | null;
  subject:
    | (number & {
        created_at: string;
        id: number;
        joint: number | null;
        name: string;
        school: string | null;
      })
    | null;
  image: string;
};

export const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={avatar({
          gender: row.original.gender,
          first_name: row.original.first_name,
          last_name: row.original.last_name,
        })}
        alt={`${row.original.first_name} ${row.original.last_name}`}
        width={32}
        height={32}
        className="rounded-full"
      />
    ),
  },
  {
    id: "name",
    accessorFn: (row) => {
      return `${row.first_name} ${row.middle_name} ${row.last_name}`;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span>
        {row.original.first_name} {row.original.middle_name}{" "}
        {row.original.last_name}
      </span>
    ),
  },
  {
    accessorKey: "gender",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "group",
    accessorFn: (row) => {
      return `${row.group.name}`;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Group
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell({ row }) {
      return <span>{row.original.group.name}</span>;
    },
  },
  {
    id: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell({ row }) {
      return <span>{row.original.subject?.name || "N/A"} </span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isOwn, setIsOwn] = useState(false);
      const [groups, setGroups] = useState<Tables<"group">[] | null>(null);
      useEffect(() => {
        const getUser = async () => {
          const supabase = await createClient();
          const {
            data: { user },
            error,
          } = await supabase.auth.getUser();
          if (error || !user) {
            toast.error("Something went wrong! Reload the page.");
          }
          const { staff } = await getStaff();

          setIsOwn(
            row.original.id === user?.id || staff.group.name !== "PRINCIPAL"
              ? true
              : false,
          );
        };

        const getGroups = async () => {
          const supabase = await createClient();
          const { data, error } = await supabase.from("group").select("*");
          if (error || !data) {
            toast.error("Something went wrong! Reload the page.");
          }
          console.log(data);
          setGroups(data);
        };

        getUser();
        getGroups();
      }, []);

      return (
        <div className="flex space-x-4 text-xs font-thin">
          {!isOwn && (
            <>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"ghost"} className="border-border border">
                    Manage Access
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[550px]">
                  <SheetHeader>
                    <SheetTitle>Manage Access of Staff</SheetTitle>
                    <SheetDescription>
                      Change access parameters of{" "}
                      <b>
                        {row.original.first_name} {row.original.last_name}
                      </b>
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-2 px-5">
                    {groups && (
                      <div className="flex justify-between">
                        <span>All Exams</span>
                        <Select value={String(row.original.group.id)}>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={row.original.group.id}
                              placeholder="Roles"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {groups.map((group, idx) => (
                              <SelectItem value={String(group.id)} key={idx}>
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Menu />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex space-x-1">
                    <Trash />
                    <span>Remove Member</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      );
    },
  },
];
