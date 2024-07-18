"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";

import { blogColumns } from "@/components/dashboard/data-table/blog-columns";
import { DataTable } from "@/components/dashboard/services/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { constants } from "@/config/constants";
import { deleteBlogList } from "@/queries/blog";
import { ChevronDown, Plus } from "lucide-react";




export type BlogListProps = {
  data: any;
};

const BlogList: React.FC<BlogListProps> = ({ data }) => {
  const tResponse = useTranslations("responses");
  const tDashboardBlog = useTranslations("dashboard.blog");
  const tCallToAction = useTranslations("callToAction");

  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteBlogList = async () => {
    try {
      await deleteBlogList();
      toast({
        title: tResponse("allBlogsDeletedSuccessfully"),
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponse("failedToDeleteAllBlogs"),
        description: tResponse("pleaseTryAgain"),
      });
    }
  };

  return (
    <>
      <div className="mb-7 flex justify-between items-center flex-col md:flex-row">
        <h2 className="md:text-3xl pb-2 md:pb-0">{tDashboardBlog("engineeringBlogs")}</h2>
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <Link
            href={constants.links.adminNewBlog}
            className="bg-primary rounded-md py-1.5 px-3 md:py-2.5 md:px-4 text-xs md:text-base flex gap-1.5"
          >
            {tCallToAction("addNewBlog")}
            <Plus strokeWidth={1.4} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-[0.014rem] border-primary py-1.5 px-3 md:py-2.5 md:px-4 rounded-md text-xs md:text-base flex gap-1.5">
              {tCallToAction("additionalSettings")}
              <ChevronDown strokeWidth={1.4} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-3">
              <DropdownMenuItem
                onClick={() => handleDeleteBlogList()}
                className="cursor-pointer w-full flex justify-end py-1.5"
              >
                {tCallToAction("deleteAllBlogs")}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer w-full flex justify-end py-1.5">
                <Link href={constants.links.adminDashboard}>
                  {tCallToAction("backToDashboard")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="pb-2.5 flex justify-center items-center">
        <h2 className="md:text-2xl">{tDashboardBlog("allEngineeringBlogs")}</h2>
      </div>
      <div className="mx-auto">
        <DataTable columns={blogColumns} data={data} />
      </div>
    </>
  );
};

export default BlogList;
