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
import { deleteImage } from "@/queries/gallery";
import { Image } from "@/types/image";

export const imageColumns: ColumnDef<Image>[] = [
  {
    accessorKey: "title",
    header: "عنوان الصورة",
  },
  {
    accessorKey: "isDisabled",
    header: "الحالة",
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
      const image = row.original;
      const router = useRouter();
      const { toast } = useToast();

      const handleDeleteImageById = async (imageId: string) => {
        try {
          await deleteImage(imageId);
          router.refresh();
          toast({
            title: "حذف الصورة بنجاح",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "فشل حذف الصورة",
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
              <Link href={`/admin-dashboard/gallery/${image.id}`}>
                عرض معلومات الصورة
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin-dashboard/gallery/update/${image.id}`}>
                تعديل الصورة
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteImageById(image?.id)}
              className="cursor-pointer"
            >
              حذف الصورة
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
