"use client";

import { ModeToggle } from "@/components/global/mode-toggle";
import { media } from "@/config/media";
import { navigationLinks } from "@/lib/data";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { clsx } from "clsx";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  const currentPath = usePathname();
  return (
    <div className="p-4 flex items-center justify-between relative">
      <aside className="flex items-center gap-2">
        <Image
          src={media.images.logos.default}
          alt="abak"
          width={1000}
          height={1000}
          className="w-[3rem] md:w-[8rem] h-auto"
        />
      </aside>
      <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ul className="flex items-center justify-center gap-8">
          {navigationLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={clsx(
                "relative text-lg hover:text-primary hover:active-link transform transition-all",
                {
                  "active-link text-primary z-10":
                    currentPath === item.href,
                }
              )}
            >
              {item.title}
            </Link>
          ))}
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={"/dashboard/sign-in"}
          className="bg-primary text-white flex items-center justify-center py-1.5 px-4 rounded-md transition-all"
        >
          تسجيل الدخول
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
