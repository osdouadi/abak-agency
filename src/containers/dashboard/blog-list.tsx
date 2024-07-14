"use client";

import { blogColumns } from "@/components/dashboard/data-table/blog-columns";
import { DataTable } from "@/components/dashboard/services/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { deleteBlogList } from "@/queries/blog";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export type BlogListProps = {
  data: any;
};

const BlogList: React.FC<BlogListProps> = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteBlogList = async () => {
    try {
      await deleteBlogList();
      toast({
        title: "حذف جميع التصنيفات بنجاح",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "فشل حذف التصنيفات",
        description: "الرجاء المحاولة مرة اخرى!",
      });
    }
  };

  return (
    <>
      <div className="mb-7 flex justify-between items-center">
        <h2 className="md:text-3xl"> المقالات الهندسية</h2>
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <Link
            href={"/admin-dashboard/blogs/new"}
            className="bg-primary rounded-md py-1.5 px-3 md:py-2.5 md:px-4 text-xs md:text-base flex gap-1.5"
          >
            إضافة تصنيف جديد
            <Plus strokeWidth={1.4} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-[0.014rem] border-primary py-1.5 px-3 md:py-2.5 md:px-4 rounded-md text-xs md:text-base flex gap-1.5">
              إعدادات إضافية
              <ChevronDown strokeWidth={1.4} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-3">
              <DropdownMenuItem
                onClick={() => handleDeleteBlogList()}
                className="cursor-pointer w-full flex justify-end py-1.5"
              >
                حذف جميع التصنيفات
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
        <DataTable columns={blogColumns} data={JSON.parse(data)} />
      </div>
    </>
  );
};

export default BlogList;
