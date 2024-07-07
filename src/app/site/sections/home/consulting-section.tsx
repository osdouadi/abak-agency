import ConsultingForm from "@/components/forms/consulting-form";
import FeatureCard from "@/components/global/feature-card";
import SectionHeader from "@/components/global/section-header";
import SectionSubheader from "@/components/global/section-subheader";
import { consultingServiceFeatures } from "@/lib/data";
import React from "react";

const ConsultingSection: React.FC = () => {
  return (
    <section className="min-h-screen w-full md:pt-16 flex px-10">
      <div className="w-1/2">
        <div className="text-right">
          <SectionHeader>تواصل مع مستشارك الان من بيتك</SectionHeader>
          <SectionSubheader>
            اباك تنسيك انشغالاتك الهندسية, احجز موعد في دقائق و تواصل مع خبير من
            بيتك!
          </SectionSubheader>
        </div>
        <ConsultingForm />
      </div>
      <div className="flex flex-col justify-center gap-14 mx-auto">
        {consultingServiceFeatures.map((item, index) => (
          <FeatureCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default ConsultingSection;
