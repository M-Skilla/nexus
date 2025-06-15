"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import {
  BadgeCheck,
  ChevronsUpDown,
  Loader2,
  LogOut,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { logout } from "@/app/(auth)/login/action";
import { getStaff } from "@/lib/get-staff";
import UserAvatar from "./avatar";

type userProps = {
  email: string | undefined;
  avatar: string;
  created_at: string;
  first_name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  group: number | null;
  id: string;
  is_owner: boolean;
  last_name: string;
  middle_name: string;
  school: string | null;
  subject: number | null;
};

const NavUser2 = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [user, setUser] = useState<userProps | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { staff, error } = await getStaff();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      console.log(staff);
      setUser(staff);
    };

    fetchUserData();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <div className="hover:bg-muted flex items-center gap-5 rounded-[10px] p-1">
            <a href="#" className="flex items-center gap-2">
              <UserAvatar name={`${user.first_name} ${user.last_name}`} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.first_name} {user.last_name}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </a>
            <ChevronsUpDown className="ml-auto size-4" />
          </div>
        ) : (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "bottom"}
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
            toast.promise(logout, {
              loading: "Logging out...",
              success: (data: { error: string | null }) => {
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
  );
};

export default NavUser2;
