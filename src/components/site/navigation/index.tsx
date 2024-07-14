"use client";

import { ModeToggle } from "@/components/global/mode-toggle";
import { media } from "@/config/media";
import { navigationLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { clsx } from "clsx";
import MobileNavigation from "./mobile-navigation";
import { useTranslations } from "next-intl";
import { constants } from "@/config/constants";
import { User } from "@/types/user";
import { useExtractLocaleFromPath } from "@/hooks/useExtractLocaleFromPath";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  const tHeader = useTranslations("site.header");
  const tCallToAction = useTranslations("callToAction");
  const currentPath = usePathname();
  const locale = useExtractLocaleFromPath();

  return (
    <div className="fixed top-0 right-0 left-0 py-2.5 px-4 flex items-center justify-between z-40 bg-card">
      <aside className="flex items-center gap-2">
        <Image
          src={media.images.logos.brandLogo}
          alt="abak"
          width={1000}
          height={1000}
          className="w-[5rem] md:w-[8rem] h-auto"
        />
      </aside>
      <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ul
          className={clsx("flex items-center justify-center gap-8", {
            "flex-row-reverse": locale === "ar",
          })}
        >
          {navigationLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={clsx(
                "relative text-lg hover:text-primary hover:active-link transform transition-all",
                {
                  "active-link text-primary z-10": currentPath === item.href,
                }
              )}
            >
              {tHeader(item.title)}
            </Link>
          ))}
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <div className="hidden md:block">
          {!user ? (
            <Link
              href={constants.links.login}
              className="bg-primary text-white flex items-center justify-center py-1.5 px-4 rounded-md transition-all"
            >
              {tCallToAction("login")}
            </Link>
          ) : (
            <>
              <span className="text-white">{user.firstName}</span>
            </>
          )}
        </div>

        <ModeToggle />
        <MobileNavigation user={user} />
      </aside>
    </div>
  );
};

export default Navigation;
