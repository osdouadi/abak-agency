import { constants } from "@/config/constants";
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type ServiceCardProps = {
  index: number;
  title: string;
  categoryId: string;
  id: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  index,
  title,
  categoryId,
  id,
}) => {
  return (
    <Link
      key={index}
      href={`${constants.links.siteCategories}${categoryId}/${id}`}
      className="bg-card text-sm p-3 md:p-4 border-2 border-primary/30 rounded-md cursor-pointer flex items-center justify-between"
    >
      <span className="md:text-lg">{title}</span>
      <ChevronsLeft strokeWidth={1.5} className="md:h-6 md:w-6" />
    </Link>
  );
};

export default ServiceCard;
