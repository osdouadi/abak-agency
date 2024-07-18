import { constants } from '@/config/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
    title: string,
    icon: string
}

const CategoryCard: React.FC<Props> = ({id, title, icon}) => {
  return (
    <Link
      href={`${constants.links.siteCategories}${id}`}
      className="flex flex-col items-center gap-2 cursor-pointer relative hover:active-link hover:text-primary hover:scale-110 transform transition-all"
    >
      <img
        src={icon}
        alt="test"
        className="w-16 h-16 md:w-[5rem] md:h-[5rem]"
      />
      <span>{title}</span>
    </Link>
  );
}

export default CategoryCard;