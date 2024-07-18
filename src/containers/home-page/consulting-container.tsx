import ConsultingForm from "@/components/forms/consulting-form";
import ConsultingHeaderGroup from "@/components/site/consulting/consulting-header-group";
import ConsultingServiceFeatures from "@/components/site/consulting/consulting-service-features";
import React from "react";

const ConsultingContainer: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col md:flex-row mt-5 md:mt-8 px-5 md:px-10 md:gap-8">
      <div className="w-full md:w-[75%]">
        <ConsultingHeaderGroup />
        <ConsultingForm />
      </div>
      <ConsultingServiceFeatures />
    </section>
  );
};

export default ConsultingContainer;
