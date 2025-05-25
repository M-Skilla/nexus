"use client";

import NavBreadcrumb from "@/components/breadcrumb/nav-breadcrumb";
import NavUser2 from "@/components/nav-user2";
import Link from "next/link";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const params = useParams();

  const { id } = params;

  const links = [
    {
      name: "Examinations",
      href: "/school",
    },
    {
      name: "Members",
      href: `/school/${id}/members`,
    },
    {
      name: "Settings",
      href: "/school/settings",
    },
  ];

  return (
    <div className="relative mb-9 flex w-full flex-col space-y-8 px-7">
      <div className="bg-sidebar/50 border-b-sidebar-border absolute top-0 left-0 flex h-[65px] w-full items-center justify-between border-b px-5">
        <NavBreadcrumb />
        {pathname !== "/school" && (
          <div className="hidden items-center justify-center gap-2 text-sm md:flex">
            {links.map((link, index) => (
              <Link
                key={index}
                className={cn(
                  "hover:bg-muted text-muted-foreground flex w-[100px] justify-center rounded-[10px] p-1",
                  // Highlight the 'Members' link when on the Members page
                  (pathname.startsWith(link.href) ||
                    (link.name === "Members" &&
                      pathname === "/school/members")) &&
                    "text-primary",
                )}
                href={link.href}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        )}
        <NavUser2 />
      </div>
      {children}
    </div>
  );
};

export default Layout;
