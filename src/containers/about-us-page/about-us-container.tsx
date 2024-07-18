import PageDescription from '@/components/global/page-description';
import PageTitle from '@/components/global/page-title';
import { media } from '@/config/media';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'

const AboutUsContainer = () => {
    const tAboutUs = useTranslations("site.aboutUsPage")
  return (
    <>
      <div className="h-[52.5vw] w-full md:h-[34vw] relative">
        <Image
          src={media.images.aboutUsPage.aboutUs}
          alt={"abak"}
          className="h-[52.5vw] w-full md:h-[34vw] absolute"
        />
      </div>
      <div className="py-5 px-4 md:p-10">
        <PageTitle>{tAboutUs("aboutUS")}</PageTitle>
        <PageDescription>{tAboutUs("content")}</PageDescription>
      </div>
    </>
  );
}

export default AboutUsContainer