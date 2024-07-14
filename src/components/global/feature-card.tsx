import React from "react";
import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const FeatureCard: React.FC<Props> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center text-center md:text-start gap-4">
      <div className="flex justify-center items-center bg-blue-200/10 rounded-lg p-2.5">
        {React.createElement(icon, {
          className: "w-12 h-12 md:w-16 md:h-16 text-primary",
          strokeWidth: 1.25,
        })}
      </div>
      <div>
        <h3 className="md:text-lg font-bold tracking-wider pb-1">{title}</h3>
        <p className="md:text-lg">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
