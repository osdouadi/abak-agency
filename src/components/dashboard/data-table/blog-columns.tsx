"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Blog } from "@/types/blog";
import { deleteBlog } from "@/queries/blog";
import { useTranslations } from "next-intl";
import { constants } from "@/config/constants";

export const blogColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title.ar",
    header: "blogTitle",
  },
  {
    accessorKey: `createdAt`,
    header: "blogCreatedAt",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    header: "actions",
    id: "actions",
    cell: ({ row }) => {
      const blog = row.original;
      const router = useRouter();
      const { toast } = useToast();
      const tResponse = useTranslations("responses");
      const tCallToAction = useTranslations("callToAction");

      const handleDeleteBlogById = async (blogId: string) => {
        try {
          await deleteBlog(blogId);
          router.refresh();
          toast({
            title: tResponse("blogDeletedSuccessfully"),
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: tResponse("failedToDeleteAllBlogs"),
            description: tResponse("pleaseTryAgain"),
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col items-end">
            <DropdownMenuItem>
              <Link href={`${constants.links.adminUpdateBlog}${blog?.id}`}>
                {tCallToAction("editBlog")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteBlogById(blog?.id)}
              className="cursor-pointer"
            >
              {tCallToAction("deleteBlog")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
