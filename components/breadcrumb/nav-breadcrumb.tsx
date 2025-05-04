"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronsUpDown, Loader2, Plus, School, Slash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

interface School {
  school: {
    id: string;
    name: string;
  };
}

const NavBreadcrumb = () => {
  const isMobile = useIsMobile();
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const pathname = usePathname();
  const schoolId = params?.id as string;

  // Check if we're in a school path with an ID
  const showSchoolBreadcrumb = pathname?.includes("/school/") && schoolId;

  // Get current school data
  const currentSchool = schools.find((s) => s.school.id === schoolId)?.school;

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase.functions.invoke(
          "retrieve-schools-for-staff",
        );

        if (error) {
          throw new Error(`Error fetching schools: ${error.message}`);
        }

        if (data && Array.isArray(data) && data.length > 0) {
          console.log(data);
          setSchools(data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch schools");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Image
              src="/nexus.svg"
              alt="Logo"
              width={100}
              height={35}
              className="aspect-auto cursor-pointer"
            />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {showSchoolBreadcrumb && (
          <>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hover:bg-muted flex cursor-pointer items-center gap-5 rounded-[10px] p-1">
                    {currentSchool ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          {currentSchool.name || "Unknown School"}
                        </span>
                      </div>
                    ) : isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span>Unknown School</span>
                    )}
                    <ChevronsUpDown className="ml-auto size-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "bottom"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuGroup>
                    {schools
                      .filter((s) => s.school.id !== schoolId)
                      .map((filteredSchool) => (
                        <DropdownMenuItem key={filteredSchool.school.id}>
                          <BreadcrumbLink
                            href={`/school/${filteredSchool.school.id}`}
                            className="flex w-full items-center gap-2"
                          >
                            {filteredSchool.school.name}
                          </BreadcrumbLink>
                        </DropdownMenuItem>
                      ))}
                    <DropdownMenuItem>
                      <div className="flex w-full items-center gap-2">
                        <Plus className="size-4" />
                        <span>Add School</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/school"
                        className="flex w-full items-center gap-2"
                      >
                        <School className="size-4" />
                        <span>View Schools</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadcrumb;
