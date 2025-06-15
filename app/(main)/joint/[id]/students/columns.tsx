import { Checkbox } from "@/components/ui/checkbox";
import { Tables } from "@/supabase/supabase-types";
import { ColumnDef } from "@tanstack/react-table";

export const column: ColumnDef<Tables<"students">>[] = [
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
    size: 50, // Small fixed size for select
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    size: 150, // Example width
  },
  {
    accessorKey: "middle_name",
    header: "Middle Name",
    size: 150, // Example width
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    size: 150, // Example width
  },
  {
    accessorKey: "gender",
    header: "Gender",
    size: 100, // Example width
  },
];
