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
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStaff, logout } from "@/app/(auth)/login/action";

const NavUser2 = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await getStaff();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      console.log(data);
      setUser(data);
    };

    fetchUserData();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <div className="hover:bg-muted flex items-center gap-5 rounded-[10px] p-1">
            <a href="#" className="flex items-center gap-2">
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg">
                <Image
                  src={user?.resData.avatar}
                  alt="Logo"
                  width={32}
                  height={32}
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.resData.name}
                </span>
                <span className="truncate text-xs">{user?.resData.email}</span>
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
  );
};

export default NavUser2;
