import NavBreadcrumb from "@/components/breadcrumb/nav-breadcrumb";
import NavUser2 from "@/components/nav-user2";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const links = [
  {
    name: "Examinations",
    href: "/joints",
  },
  {
    name: "Members",
    href: "/members",
  },
  {
    name: "Settings",
    href: "/joints/settings",
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mb-9 flex w-full flex-col space-y-8 px-7">
      <div className="bg-sidebar/50 border-b-sidebar-border absolute top-0 left-0 flex h-[65px] w-full items-center justify-between border-b px-5">
        <NavBreadcrumb />
        <div className="hidden items-center justify-center gap-2 text-sm md:flex">
          {links.map((link, index) => (
            <Link
              key={index}
              className="hover:bg-muted text-muted-foreground flex w-[100px] justify-center rounded-[10px] p-1"
              href={link.href}
            >
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
        <NavUser2 />
      </div>
      {children}
    </div>
  );
};

export default Layout;
