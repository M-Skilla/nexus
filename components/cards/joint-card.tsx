import React from "react";
import { Separator } from "../ui/separator";
import { Database, Tables } from "@/supabase/supabase-types";
import { Calendar } from "lucide-react";

type JointCardProps = {
  exam: Tables<"joint">;
};

const JointCard = ({ exam }: JointCardProps) => {
  return (
    <div
      className="border-border bg-card flex h-[200px] cursor-pointer flex-col justify-between rounded-[10px] border p-3"
      key={exam.id}
    >
      <div className="flex flex-col gap-[3px]">
        <span className="truncate text-xl font-bold">{exam.name}</span>
        <div className="text-muted-foreground flex items-center gap-[3px] text-xs">
          <Calendar className="h-4 w-4" />
          {new Date(exam.start_date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <p className="text-muted-foreground line-clamp-2 text-sm">
        {exam.description}
      </p>
      <div className="flex flex-col gap-1">
        <Separator className="my-2" />
        <span className="text-muted-foreground text-sm">
          Deadline:{" "}
          {new Date(exam.end_date).toLocaleString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default JointCard;
