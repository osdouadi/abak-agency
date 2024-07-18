"use client"

import { constants } from '@/config/constants';
import { media } from '@/config/media';
import { useExtractLocaleFromPath } from '@/hooks/useExtractLocaleFromPath';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'

const HeroContainer = () => {
  const tHomePage = useTranslations("site.homePage")
  const locale  = useExtractLocaleFromPath()

  return (
    <section className="min-h-screen w-full md:pt-[170px] relative flex items-center justify-center flex-col overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <p className="text-center text-[1.3rem] md:text-3xl pb-1.5 z-10">
        {tHomePage("heroSectionSlogan")}
      </p>
      <div className="bg-gradient-to-t from-primary to-secondary-foreground text-transparent bg-clip-text relative z-10">
        <h1 className="text-8xl font-bold text-center md:text-[245px] md:pb-12">
          {locale === "ar" ? constants.app.appNameAR : constants.app.appNameEN}
        </h1>
      </div>
      <div className="flex justify-center items-center relative md:mt-[-70px] z-10">
        <Image
          src={media.images.homePage.hero_01}
          alt="test"
          width={1200}
          height={1200}
          priority={true}
          className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
        />
      </div>
      <div className="bottom-0 top-1/2 bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
      <div className="hero-strap-animation-top-right-left bg-primary shadow-2xl"></div>
      <div className="hero-strap-animation-top-left-right bg-primary shadow-2xl"></div>
      <div className="hero-strap-animation-left-up-down bg-primary shadow-2xl"></div>
      <div className="hero-strap-animation-left-up-down bg-primary shadow-2xl"></div>
      <div className="hero-strap-animation-right-up-down bg-primary shadow-2xl"></div>
      <div className="hero-strap-animation-right-up-down bg-primary shadow-2xl"></div>
    </section>
  );
}

export default HeroContainer;