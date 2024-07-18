import FeatureCard from '@/components/global/feature-card';
import { consultingServiceFeatures } from '@/lib/data';
import { useTranslations } from 'next-intl';
import React from 'react'

const ConsultingServiceFeatures: React.FC = () => {
  const tHomePage = useTranslations("site.homePage")
  return (
    <div className="flex flex-col justify-center gap-5 md:gap-8 mx-auto py-8 md:pt-0 md:w-auto">
      {consultingServiceFeatures.map((item, index) => (
        <FeatureCard
          key={index}
          title={tHomePage(item.title)}
          description={tHomePage(item.description)}
          icon={item.icon}
        />
      ))}
    </div>
  );
}

export default ConsultingServiceFeatures;