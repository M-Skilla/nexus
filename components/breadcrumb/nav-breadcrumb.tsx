"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader2, Plus, School, Slash } from "lucide-react";
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
  const [schoolName, setSchoolName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const schoolId = params?.id as string;

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("school")
          .select("name")
          .eq("id", schoolId)
          .single();
        if (error) {
          throw new Error(`Error fetching schools: ${error.message}`);
        }

        if (data) {
          console.log(data);
          setSchoolName(data.name);
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

        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span>{schoolName}</span>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadcrumb;
