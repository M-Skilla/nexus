import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="mt-[90px] flex justify-between">
        <Skeleton className="h-8 w-36" />{" "}
        {/* Skeleton for "Your Schools" title */}
        <Skeleton className="h-10 w-32" />{" "}
        {/* Skeleton for "Add School" button */}
      </div>

      {/* Skeleton for the grid of school cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 px-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-[200px] rounded-lg border p-4" />
        ))}
      </div>
    </>
  );
};

export default Loading;
