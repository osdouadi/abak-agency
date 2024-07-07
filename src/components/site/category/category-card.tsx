import Image from 'next/image';
import React from 'react'

type Props = {
    title: string,
    icon: string
}

const CategoryCard: React.FC<Props> = ({title, icon}) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer relative hover:active-link hover:text-primary hover:scale-110 transform transition-all">
      <Image
        src={icon}
        alt="test"
        width={100}
        height={100}
        className="w-[5rem] h-[5rem]"
      />
      <span>{title}</span>
    </div>
  );
}

export default CategoryCard;