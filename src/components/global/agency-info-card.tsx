import { LucideIcon } from 'lucide-react';
import React from 'react'

type Props = {
    title: string,
    details: string,
    icon: LucideIcon
}

const AgencyInfoCard: React.FC<Props> = ({title, details, icon}) => {
  return (
    <div className="flex flex-col text-white">
      <div className="flex items-center gap-2 pb-4">
        {React.createElement(icon, {
            className: "w-6 h-6",
            strokeWidth: 1.4
        })}
        <h3 className='pt-1.5 font-bold tracking-wide'>{title}</h3>
      </div>
      <p>{details}</p>
    </div>
  );
}

export default AgencyInfoCard