import SectionHeader from '@/components/global/section-header';
import SectionSubheader from '@/components/global/section-subheader';
import CategoryCard from '@/components/site/category/category-card';
import { categoriesData } from '@/data/data';
import React from 'react'

const CategoriesSection = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 md:mt-16">
     <SectionHeader>خدمات مكتب اباك</SectionHeader>
      <SectionSubheader>
        نلبي جميع إحتياجاتكم الهندسية عن طريق توفير مجموعة واسعة من الخدمات
        الهندسية تحت تصرفكم
      </SectionSubheader>
      <div className="flex justify-center items-center gap-14">
        {categoriesData.map((item, index) => (
          <CategoryCard key={index} title={item.title} icon={item.icon} />
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;