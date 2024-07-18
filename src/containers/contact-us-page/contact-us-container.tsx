import ContactForm from '@/components/forms/contact-form';
import PageDescription from '@/components/global/page-description';
import PageTitle from '@/components/global/page-title';
import { media } from '@/config/media';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'

const ContactUsContainer = () => {
    const tContactUs = useTranslations("site.contactUsPage");
  return (
    <>
      <div className="h-[52.5vw] w-full md:h-[34vw] relative">
        <Image
          src={media.images.contactUsPage.contactUs}
          alt={"abak"}
          className="h-[52.5vw] w-full md:h-[34vw] absolute"
        />
      </div>
      <div className="py-5 px-4 md:p-10">
        <PageTitle>{tContactUs("contactUS")}</PageTitle>
        <PageDescription>{tContactUs("content")}</PageDescription>
      </div>
      <ContactForm />
    </>
  );
}

export default ContactUsContainer;