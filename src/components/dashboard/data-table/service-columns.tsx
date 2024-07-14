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
import { deleteEngineeringService } from "@/queries/engineering-service";

export interface Service {
  id: string;
  title: { ar: string; en: string };
  category: string
  createdAt: string;
}

export const serviceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "title.ar",
    header: "عنوان الخدمة",
  },
  {
    accessorKey: "category.title.ar",
    header: "تصنيف الخدمة",
  },
  {
    accessorKey: `createdAt`,
    header: "تاريخ إضافة الخدمة",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    header: "الاجراءات",
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;
      const router = useRouter();
      const { toast } = useToast();

      const handleDeleteServiceById = async (serviceId: string) => {
        try {
          await deleteEngineeringService(serviceId);
          router.refresh();
          toast({
            title: "حذف الخدمة بنجاح",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "فشل حذف الخدمة",
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
                href={`/admin-dashboard/engineering-services/${service.id}`}
              >
                عرض معلومات الخدمة
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/admin-dashboard/engineering-services/update/${service?.id}`}
              >
                تعديل الخدمة
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteServiceById(service?.id)}
              className="cursor-pointer"
            >
              حذف الخدمة
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
