import ContactForm from '@/components/forms/contact-form';
import PageDescription from '@/components/global/page-description';
import PageTitle from '@/components/global/page-title';
import { media } from '@/config/media';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'

const PricingContainer = () => {
    const tPricing = useTranslations("site.pricingPage");
  return (
    <>
      <div className="h-[52.5vw] w-full md:h-[34vw] relative">
        <Image
          src={media.images.pricingPage.pricing}
          alt={"abak"}
          className="h-[52.5vw] w-full md:h-[34vw] absolute"
        />
      </div>
      <div className="py-5 px-4 md:p-10">
        <PageTitle>{tPricing("pricing")}</PageTitle>
        <PageDescription>{tPricing("content")}</PageDescription>
      </div>
      <ContactForm />
    </>
  );
}

export default PricingContainer;