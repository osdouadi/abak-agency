import SectionHeader from '@/components/global/section-header';
import SectionSubheader from '@/components/global/section-subheader';
import { useTranslations } from 'next-intl';
import React from 'react'

const ConsultingHeaderGroup: React.FC = () => {
  const tHeaderGroup = useTranslations("site.headerGroups")
  return (
    <div className="text-center md:text-start">
      <SectionHeader>{tHeaderGroup("consultingHeader")}</SectionHeader>
      <SectionSubheader>{tHeaderGroup("consultingSubheader")}</SectionSubheader>
    </div>
  );
}

export default ConsultingHeaderGroup;