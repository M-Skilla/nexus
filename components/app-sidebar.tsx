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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";
// import { getStaff } from "@/app/(auth)/login/action";

const data = {
  navSecondary: [
    {
      title: "Notifications",
      url: "#",
      icon: BellIcon,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
    {
      title: "School Settings",
      url: "/settings/school",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },

    {
      name: "Students",
      url: "/students",
      icon: User,
    },
    {
      name: "Subjects",
      url: "/subjects",
      icon: BookA,
    },
    {
      name: "Report",
      url: "/report",
      icon: File,
    },
    {
      name: "Grading",
      url: "/grade",
      icon: ChartBar,
    },
    // {
    //   name: "Joint",
    //   url: "/joint",
    //   icon: Frame,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar();
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data) {
        console.error("Error fetching user data:", error);
        return;
      }

      const { data: staffUser, error: staffError } = await supabase
        .from("staff")
        .select()
        .eq("id", data.user.id)
        .single();

      if (staffError || !staffUser) {
        console.error("Error fetching staff data:", staffError);
        return;
      }

      setUser({
        name: `${staffUser.first_name} ${staffUser.last_name}`,
        email: data.user.email || "",
        avatar:
          `https://avatar.iran.liara.run/public/${staffUser.gender === "MALE" ? "boy" : "girl"}?username=${staffUser.first_name}${staffUser.last_name}` ||
          "",
      });
    }

    fetchUser();
  }, [supabase]);

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
                    <div className="bg-sidebar-primary/15 text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                      <Image
                        src="/favicon.ico"
                        alt="Logo"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Nexus</span>
                      <span className="truncate text-xs">NECTA</span>
                    </div>
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
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
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
