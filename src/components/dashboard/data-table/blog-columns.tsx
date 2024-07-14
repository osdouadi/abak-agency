"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Blog } from "@/types/blog";
import { deleteBlog } from "@/queries/blog";

export const blogColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title.ar",
    header: "عنوان المقال",
  },
  {
    accessorKey: `createdAt`,
    header: "تاريخ إضافة المقال",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    header: "الاجراءات",
    id: "actions",
    cell: ({ row }) => {
      const blog = row.original;
      const router = useRouter();
      const { toast } = useToast();

      const handleDeleteBlogById = async (blogId: string) => {
        try {
          await deleteBlog(blogId);
          router.refresh();
          toast({
            title: "حذف المقال بنجاح",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "فشل حذف المقال",
            description: "الرجاء المحاولة مرة اخرى!",
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">الإجراءات</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col items-end">
            <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin-dashboard/blogs/${blog?.id}`}>
                عرض معلومات المقال
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin-dashboard/blogs/update/${blog?.id}`}>
                تعديل المقال
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteBlogById(blog?.id)}
              className="cursor-pointer"
            >
              حذف المقال
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
