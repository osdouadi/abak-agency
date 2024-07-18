"use client";

import React from "react";
import Link from "next/link";

import { categoryColumns } from "@/components/dashboard/data-table/category-columns";
import { DataTable } from "@/components/dashboard/services/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { constants } from "@/config/constants";
import { deleteEngineeringCategoriesList } from "@/queries/engineering-category";

export type CategoriesListProps = {
  data: any;
};

const CategoryList: React.FC<CategoriesListProps> = ({ data }) => {
  const tDashboardEngineeringCategory = useTranslations(
    "dashboard.engineeringCategory"
  );
  const tCallToAction = useTranslations("callToAction");
  const tResponses = useTranslations("responses");

  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteCategoryList = async () => {
    try {
      await deleteEngineeringCategoriesList();
      toast({
        title: tResponses("allEnineeringCategoriesDeletedSuccessfully"),
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponses("failedToDeleteAllEnineeringCategories"),
        description: tResponses("pleaseTryAgain"),
      });
    }
  };

  return (
    <>
      <div className="mb-7 flex justify-between items-center">
        <h2 className="md:text-3xl">
          {tDashboardEngineeringCategory("engineeringCategories")}
        </h2>
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <Link
            href={constants.links.adminNewEngineeringCategory}
            className="bg-primary rounded-md py-1.5 px-3 md:py-2.5 md:px-4 text-xs md:text-base flex gap-1.5"
          >
            {tCallToAction("addNewCategory")}
            <Plus strokeWidth={1.4} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-[0.014rem] border-primary py-1.5 px-3 md:py-2.5 md:px-4 rounded-md text-xs md:text-base flex gap-1.5">
              {tCallToAction("additionalSettings")}
              <ChevronDown strokeWidth={1.4} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-3">
              <DropdownMenuItem
                onClick={() => handleDeleteCategoryList()}
                className="cursor-pointer w-full flex justify-end py-1.5"
              >
                {tCallToAction("deleteAllCategories")}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer w-full flex justify-end py-1.5">
                <Link href={constants.links.adminEngineeringServices}>
                  {tCallToAction("showServices")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="pb-2.5 flex justify-center items-center">
        <h2 className="md:text-2xl">
          {tDashboardEngineeringCategory("allEngineeringCategories")}
        </h2>
      </div>
      <div className="mx-auto">
        <DataTable columns={categoryColumns} data={data} />
      </div>
    </>
  );
};

export default CategoryList;
