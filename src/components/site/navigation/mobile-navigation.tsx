"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { navigationLinks } from "@/lib/data";
import clsx from "clsx";
import { CircleUser, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  user?: null | User;
};

const MobileNavigation: React.FC<Props> = ({ user }) => {
  const currentPath = usePathname();

  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto text-center">
            <DrawerHeader>
              <DrawerTitle>مكتب اباك للإستشارات الهندسية</DrawerTitle>
              <DrawerDescription>اباك تبني طموحك</DrawerDescription>
            </DrawerHeader>
          </div>
          <ul className="px-5">
            {navigationLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={clsx(
                  "relative w-fit flex items-center gap-3 mb-5 pb-2 hover:text-primary hover:active-link transform translate-all",
                  {
                    "text-primary active-link": currentPath === item.href,
                  }
                )}
              >
                {React.createElement(item.icon, {
                  className: "w-7 h-7",
                  strokeWidth: 1.4,
                })}
                <span className="pt-1 hover:active-link">{item.title}</span>
              </Link>
            ))}
          </ul>
          <div className="py-4 px-3 border-t-[0.012rem] border-white/40 flex items-center gap-4">
            <DrawerClose asChild>
              <Button variant="outline">
                <X className="text-red-500 h-6 w-6" />
              </Button>
            </DrawerClose>
            {!user ? (
              <Link
                href={"/sign-in"}
                className="bg-primary hover:bg-primary/80 transform text-white flex items-center justify-center py-2 px-4 rounded-md transition-all"
              >
                تسجيل الدخول
              </Link>
            ) : (
              <>
                  <div className="text-white flex items-center gap-2">
                    {user.firstName}
                    <CircleUser className="h-7 w-7" strokeWidth={1.4} />
                </div>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
