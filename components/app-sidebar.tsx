"use client";

import * as React from "react";
import {
  BadgeCheck,
  Bell,
  BellIcon,
  BookA,
  BookOpen,
  Bot,
  ChartBar,
  ChevronsUpDown,
  Command,
  CreditCard,
  File,
  Frame,
  LayoutDashboard,
  LifeBuoy,
  Loader2,
  LogOut,
  Map,
  PieChart,
  Send,
  Settings,
  Settings2,
  Sparkles,
  SquareTerminal,
  User,
  // Added icons
  Users,
  School2,
  Workflow,
  BookMarked,
  FileText,
  GraduationCap,
  MessageSquareText,
  FilePenLine,
} from "lucide-react";

import { useEffect, useState } from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { createClient } from "@/supabase/client";
import { Skeleton } from "./ui/skeleton";

import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "nextjs-toploader/app";
import { useParams } from "next/navigation";
import { Tables } from "@/supabase/supabase-types";
// import { getStaff } from "@/app/(auth)/login/action";

// Removed the first, more generic 'data' object definition.
// The 'data' object below is now the single source for navigation items.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const supabase = createClient();
  const { id } = useParams(); // This 'id' is the joint ID
  const [loading, setLoading] = useState(false);
  const [exam, setExam] = useState<Tables<"joint"> | null>(null);
  const [user, setUser] = useState<{
    created_at: string;
    first_name: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    group:
      | (number & {
          created_at: string;
          id: number;
          name: string;
        })
      | null;
    id: string;
    is_owner: boolean;
    last_name: string;
    middle_name: string;
    school:
      | (string & {
          address: string;
          city: string;
          country: string;
          created_at: string;
          email: string;
          id: string;
          name: string;
          phone_number: string;
          postal_code: string;
          region: string;
        })
      | null;
    subject:
      | (number & {
          created_at: string;
          id: number;
          joint: number | null;
          name: string;
          school: string | null;
        })
      | null;
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  // Updated data object with new icons and correct structure
  const navData = {
    navSecondary: [
      {
        title: "Notifications",
        url: "#", // Assuming notifications are not path-specific for now
        icon: Bell,
      },
      {
        title: "Feedback",
        url: "#", // Assuming feedback is not path-specific for now
        icon: MessageSquareText,
      },
    ],
    projects: [
      {
        name: "Dashboard",
        url: `/joint/${id}`,
        icon: LayoutDashboard,
      },
      {
        name: "Students",
        url: `/joint/${id}/students`,
        icon: Users,
      },
      {
        name: "Subjects",
        url: `/joint/${id}/subjects`,
        icon: BookMarked,
      },
      {
        name: "Report",
        url: `/joint/${id}/report`,
        icon: FileText,
      },
      {
        name: "Grading",
        url: `/joint/${id}/grade`,
        icon: GraduationCap,
      },
      {
        name: "Marks",
        url: `/joint/${id}/marko`,
        icon: FilePenLine, // Changed icon for Marks
      },
    ],
  };

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();

      if (error || !data || !id) {
        toast.error(`Error fetching user data: ${error}`);
        return;
      }

      const { data: staffUser, error: staffError } = await supabase
        .from("staff")
        .select("*, group(*), subject(*), school(*)")
        .eq("id", data.user.id)
        .single();

      if (staffError || !staffUser) {
        toast.error(`Error fetching staff data: ${staffError}`);
        return;
      }

      const { data: examData, error: examError } = await supabase
        .from("joint")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (examError || !examData) {
        toast.error(`Error fetching exam data: ${examError}`);
        return;
      }

      setExam(examData);

      setUser({
        ...staffUser,
        name: `${staffUser.first_name} ${staffUser.last_name}`,
        email: data.user.email || "",
        avatar:
          `https://avatar.iran.liara.run/public/${staffUser.gender === "MALE" ? "boy" : "girl"}?username=${staffUser.first_name}${staffUser.last_name}` ||
          "",
      });

      setLoading(false);
    }

    fetchUser();
  }, [supabase, id]); // Added id to dependency array

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                >
                  <a href="#" className="flex items-center gap-2">
                    <div className="bg-sidebar-primary/15 text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg">
                      <Image
                        src="/favicon.ico"
                        alt="Logo"
                        width={24}
                        height={24}
                      />
                    </div>
                    {loading ? (
                      <Skeleton className="h-15 w-[150px]" />
                    ) : (
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {exam && exam.name}
                        </span>
                        <span className="truncate text-xs">
                          {user && user.school?.name}
                        </span>
                      </div>
                    )}
                  </a>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Settings />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    const supabase = createClient();
                    toast.promise(supabase.auth.signOut(), {
                      loading: "Logging out...",
                      success: (data: { error: AuthError | null }) => {
                        if (data.error) {
                          return "Failed to log out";
                        }
                        router.push("/login");
                        return "Logged out successfully";
                      },
                      error: "Failed to log out.",
                    });
                  }}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={navData.projects} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser user={user} />
        ) : (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
