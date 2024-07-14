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
import {
  deleteEngineeringCategory,
  getEnginneringCategoriesList,
} from "@/queries/engineering-category";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export interface Category {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  categoryBanner: string;
  createdAt: string;
  updatedAt: string;
}

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "title.ar",
    header: "عنوان التصنيف",
  },
  {
    accessorKey: "services.length",
    header: "عدد الخدمات",
  },
  {
    accessorKey: `createdAt`,
    header: "تاريخ إضافة التصنيف",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    header: "الاجراءات",
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const router = useRouter();
      const { toast } = useToast();

      const handleDeleteCategoryById = async (categoryId: string) => {
        try {
          await deleteEngineeringCategory(categoryId);
          router.refresh();
          toast({
            title: "حذف التصنيف بنجاح",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "فشل حذف التصنيف",
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
              <Link
                href={`/admin-dashboard/engineering-categories/${category.id}`}
              >
                عرض معلومات التصنيف
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/admin-dashboard/engineering-categories/update/${category.id}`}
              >
                تعديل التصنيف
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteCategoryById(category?.id)}
              className="cursor-pointer"
            >
              حذف التصنيف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
