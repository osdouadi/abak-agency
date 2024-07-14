"use client";

import { serviceColumns } from "@/components/dashboard/data-table/service-columns";
import { DataTable } from "@/components/dashboard/services/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { deleteEngineeringCategoriesList } from "@/queries/engineering-category";
import { deleteEngineeringServiceList } from "@/queries/engineering-service";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export type ServiceListProps = {
  data: any;
};

const ServiceList: React.FC<ServiceListProps> = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteServiceList = async () => {
    try {
      await deleteEngineeringServiceList();
      toast({
        title: "حذف جميع الخدمات بنجاح",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "فشل حذف الخدمات",
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
            href={"/admin-dashboard/engineering-services/new-service"}
            className="bg-primary rounded-md py-1.5 px-3 md:py-2.5 md:px-4 text-xs md:text-base flex gap-1.5"
          >
            إضافة خدمة جديدة
            <Plus strokeWidth={1.4} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-[0.014rem] border-primary py-1.5 px-3 md:py-2.5 md:px-4 rounded-md text-xs md:text-base flex gap-1.5">
              إعدادات إضافية
              <ChevronDown strokeWidth={1.4} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-3">
              <DropdownMenuItem
                onClick={() => handleDeleteServiceList()}
                className="cursor-pointer w-full flex justify-end py-1.5"
              >
                حذف جميع الخدمات
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer w-full flex justify-end py-1.5">
                <Link href={"/admin-dashboard/engineering-services"}>
                  الخدمات
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="pb-2.5 flex justify-center items-center">
        <h2 className="md:text-2xl"> جميع خدمات المكتب</h2>
      </div>
      <div className="mx-auto">
        <DataTable columns={serviceColumns} data={JSON.parse(data)} />
      </div>
    </>
  );
};

export default ServiceList;
