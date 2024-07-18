"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { serviceColumns } from "@/components/dashboard/data-table/service-columns";
import { DataTable } from "@/components/dashboard/services/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { deleteEngineeringServiceList } from "@/queries/engineering-service";
import { useTranslations } from "next-intl";
import { constants } from "@/config/constants";

export type ServiceListProps = {
  data: any;
};

const ServiceList: React.FC<ServiceListProps> = ({ data }) => {
  const tResponse = useTranslations("responses");
  const tDashboardEngineeringService = useTranslations(
    "dashboard.engineeringService"
  );
  const tCallToAction = useTranslations("callToAction")

  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteServiceList = async () => {
    try {
      await deleteEngineeringServiceList();
      toast({
        title: tResponse("allEnineeringServicesDeletedSuccessfully"),
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponse("failedToDeleteAllEngineeringServices"),
        description: tResponse("pleaseTryAgain"),
      });
    }
  };

  return (
    <>
      <div className="mb-7 flex justify-between items-center">
        <h2 className="md:text-3xl">
          {tDashboardEngineeringService("detailsTitle")}
        </h2>
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <Link
            href={constants.links.adminNewEngineeringService}
            className="bg-primary rounded-md py-1.5 px-3 md:py-2.5 md:px-4 text-xs md:text-base flex gap-1.5"
          >
            {tCallToAction("addService")}
            <Plus strokeWidth={1.4} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-[0.014rem] border-primary py-1.5 px-3 md:py-2.5 md:px-4 rounded-md text-xs md:text-base flex gap-1.5">
              {tCallToAction("additionalSettings")}
              <ChevronDown strokeWidth={1.4} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-3">
              <DropdownMenuItem
                onClick={() => handleDeleteServiceList()}
                className="cursor-pointer w-full flex justify-end py-1.5"
              >
                {tCallToAction("deleteAllServices")}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer w-full flex justify-end py-1.5">
                <Link href={constants.links.adminEngineeringCategories}>
                  {tCallToAction("categories")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="pb-2.5 flex justify-center items-center">
        <h2 className="md:text-2xl">
          {tDashboardEngineeringService("allEngineeringServices")}
        </h2>
      </div>
      <div className="mx-auto">
        <DataTable columns={serviceColumns} data={data} />
      </div>
    </>
  );
};

export default ServiceList;
