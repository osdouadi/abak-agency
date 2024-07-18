"use client";

import Link from "next/link";
import React from "react";

import { imageColumns } from "@/components/dashboard/data-table/image-columns";
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

import { deleteGallery } from "@/queries/gallery";
import { useTranslations } from "next-intl";
import { constants } from "@/config/constants";


export type ImageListProps = {
  data: any;
};

const ImageList: React.FC<ImageListProps> = ({ data }) => {
  const tDashboardGallery = useTranslations(
    "dashboard.gallery"
  );
  const tCallToAction = useTranslations("callToAction");
  const tResponses = useTranslations("responses");

  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteGallery = async () => {
    try {
      await deleteGallery();
      toast({
        title: tResponses("allImagesDeletedSuccessfully"),
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponses("failedToDeleteAllImages"),
        description: tResponses("pleaseTryAgain"),
      });
    }
  };

  return (
    <>
      <div className="mb-7 flex justify-between items-center">
        <h2 className="md:text-3xl">{tDashboardGallery("projectsImages")}</h2>
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <Link
            href={constants.links.adminNewImage}
            className="bg-primary rounded-md py-1.5 px-3 md:py-2.5 md:px-4 text-xs md:text-base flex gap-1.5"
          >
            {tCallToAction("addNewImage")}
            <Plus strokeWidth={1.4} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-[0.014rem] border-primary py-1.5 px-3 md:py-2.5 md:px-4 rounded-md text-xs md:text-base flex gap-1.5">
              {tCallToAction("additionalSettings")}
              <ChevronDown strokeWidth={1.4} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-3">
              <DropdownMenuItem
                onClick={() => handleDeleteGallery()}
                className="cursor-pointer w-full flex justify-end py-1.5"
              >
                {tCallToAction("deleteAllImages")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="pb-2.5 flex justify-center items-center">
        <h2 className="md:text-2xl">
          {tDashboardGallery("allProjectsImages")}
        </h2>
      </div>
      <div className="mx-auto">
        <DataTable columns={imageColumns} data={data} />
      </div>
    </>
  );
};

export default ImageList;
