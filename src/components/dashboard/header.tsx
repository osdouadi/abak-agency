import React from 'react'
import HeaderContainer from '../global/header-container';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from '../ui/button';
import { MenuIcon, X } from 'lucide-react';
import { adminNavigationLinks } from '@/lib/data';
import Link from 'next/link';
import clsx from 'clsx';
import UserInfoHeaderCard from '../global/user-info-header-card';

const Header = () => {
  return (
    <HeaderContainer>
      <UserInfoHeaderCard />
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <MenuIcon />
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
            {adminNavigationLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={clsx(
                  "relative w-fit flex items-center gap-3 mb-5 pb-2 hover:text-primary hover:active-link transform translate-all"
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
          </div>
        </DrawerContent>
      </Drawer>
    </HeaderContainer>
  );
}

export default Header