import React from 'react'
import ContactForm from '@/components/forms/contact-form';

const ContactContainer = () => {
  return (
    <section className="min-h-screen w-full flex flex-col gap-5 px-5 md:px-10 mt-7 md:pt-10">
      <ContactForm />
    </section>
  );
}

export default ContactContainer;