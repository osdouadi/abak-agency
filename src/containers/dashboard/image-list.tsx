"use client";

import { imageColumns } from "@/components/dashboard/data-table/image-columns";
import { DataTable } from "@/components/dashboard/services/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { deleteGallery } from "@/queries/gallery";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export type ImageListProps = {
  galleryData: any;
};

const ImageList: React.FC<ImageListProps> = ({ galleryData }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteGallery = async () => {
    try {
      await deleteGallery();
      toast({
        title: "حذف جميع الصورة بنجاح",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "فشل حذف الصور",
        description: "الرجاء المحاولة مرة اخرى!",
      });
    }
  };

  return (
    <>
      <div className="mb-7 flex justify-between items-center">
        <h2 className="md:text-3xl"> الخدمات الهندسية</h2>
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <Link
            href={"/admin-dashboard/gallery/new-image"}
            className="bg-primary rounded-md py-1.5 px-3 md:py-2.5 md:px-4 text-xs md:text-base flex gap-1.5"
          >
            إضافة صورة جديدة
            <Plus strokeWidth={1.4} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-[0.014rem] border-primary py-1.5 px-3 md:py-2.5 md:px-4 rounded-md text-xs md:text-base flex gap-1.5">
              إعدادات إضافية
              <ChevronDown strokeWidth={1.4} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-3">
              <DropdownMenuItem
                onClick={() => handleDeleteGallery()}
                className="cursor-pointer w-full flex justify-end py-1.5"
              >
                حذف جميع الصور
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer w-full flex justify-end py-1.5">
                <Link href={"/admin-dashboard/gallery"}>الصور</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="pb-2.5 flex justify-center items-center">
        <h2 className="md:text-2xl"> جميع صور المكتب</h2>
      </div>
      <div className="mx-auto">
        <DataTable columns={imageColumns} data={galleryData} />
      </div>
    </>
  );
};

export default ImageList;
