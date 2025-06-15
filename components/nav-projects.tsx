"use client";

import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavProjectsProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: {
    name: string;
    url: string;
    icon?: React.ElementType;
  }[];
}

export function NavProjects({ projects, className }: NavProjectsProps) {
  const { isMobile } = useSidebar();
  const pathname = usePathname(); // Get current pathname

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = pathname === item.url; // Check for exact match
          const IconComponent = item.icon;
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={isActive ? "bg-primary/30" : ""}
              >
                <Link href={item.url}>
                  {IconComponent && <IconComponent />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
