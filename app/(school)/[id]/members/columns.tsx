"use client";
import UserAvatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { getStaff } from "@/lib/get-staff";
import { createClient } from "@/supabase/client";
import { Tables } from "@/supabase/supabase-types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Menu, Save, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { revalidateAction } from "../actions";

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
      <UserAvatar
        name={`${row.original.first_name} ${row.original.last_name}`}
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
      const [loading, setLoading] = useState(true);
      const [group, setGroup] = useState<number>(row.original.group.id);
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const supabase = await createClient();
          const {
            data: { user },
            error,
          } = await supabase.auth.getUser();

          if (error || !user) {
            toast.error("Something went wrong! Reload the page.");
          }
          const { staff } = await getStaff();

          if (!staff) {
            toast.error(
              "Failed to retrieve staff information. Please reload the page.",
            );
            setLoading(false);
            return;
          }

          const group = staff.group;

          if (!group) {
            toast.error(
              "You are not a member of any group or critical group information is missing.",
            );
            setLoading(false);
            return;
          }

          setIsOwn(row.original.id === user?.id || group.name !== "PRINCIPAL");

          const { data, error: groupErr } = await supabase
            .from("group")
            .select("*");

          if (groupErr || !data) {
            toast.error("Something went wrong! Reload the page.");
          }
          setGroups(data);
          setLoading(false);
        };

        fetchData();
      }, [row.original.id]);

      return (
        <div className="flex space-x-4 text-xs font-thin">
          {loading ? (
            <>
              <div className="bg-muted h-10 w-32 animate-pulse rounded-md" />{" "}
              {/* Skeleton for "Manage Access" Button */}
              <div className="bg-muted h-10 w-10 animate-pulse rounded-md" />{" "}
              {/* Skeleton for Menu Trigger */}
            </>
          ) : !isOwn ? (
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
                        <Select
                          value={String(group)}
                          onValueChange={(value) => setGroup(Number(value))}
                        >
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={group}
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
                  <SheetFooter className="flex justify-between">
                    <SheetClose />
                    <Button
                      className="flex gap-2"
                      onClick={async () => {
                        const toastId = toast.loading("Saving Changes...");
                        const supabase = createClient();
                        const { data, error } = await supabase
                          .from("staff")
                          .update({ group })
                          .eq("id", row.original.id)
                          .select();
                        if (error || !data) {
                          console.error(error);
                          toast.error("Failed to update!");
                        }
                        await revalidateAction("staff-members");
                        toast.success("Changes saved successfully");
                        toast.dismiss(toastId);
                      }}
                    >
                      <Save />
                      <span>Save</span>
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Trash2 className="text-destructive/80 h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex space-x-1">
                    <Trash />
                    <span>Remove Member</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : null}
        </div>
      );
    },
  },
];
