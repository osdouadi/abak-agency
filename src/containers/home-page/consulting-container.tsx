import ConsultingForm from "@/components/forms/consulting-form";
import ConsultingHeaderGroup from "@/components/site/consulting/consulting-header-group";
import ConsultingServiceFeatures from "@/components/site/consulting/consulting-service-features";
import React from "react";

const ConsultingContainer: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col md:flex-row md:pt-16 px-4 md:px-10">
      <div className="w-full md:w-1/2">
        <ConsultingHeaderGroup />
        <ConsultingForm />
      </div>
      <ConsultingServiceFeatures />
    </section>
  );
};

export default ConsultingContainer;
