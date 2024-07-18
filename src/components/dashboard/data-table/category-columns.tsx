"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";

import { formatDate } from "@/lib/utils";
import { deleteEngineeringCategory } from "@/queries/engineering-category";
import { constants } from "@/config/constants";

export interface Category {
  _id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  categoryBanner: string;
  createdAt: Date;
}

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "title.ar",
    header: "engineeringCategoryTitle",
  },
  {
    accessorKey: "services.length",
    header: "engineeringServicesCount",
  },
  {
    accessorKey: "createdAt",
    header: "engineeringCategoryCreatedAt",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    header: "actions",
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const router = useRouter();
      const tResponse = useTranslations("responses");
      const tCallToAction = useTranslations("callToAction");
      const { toast } = useToast();

      const handleDeleteCategoryById = async (categoryId: string) => {
        try {
          await deleteEngineeringCategory(categoryId);
          router.refresh();
          toast({
            title: tResponse("enineeringCategoryDeletedSuccessfully"),
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: tResponse("enineeringCategoryDeletedSuccessfully"),
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
              <Link
                href={`${constants.links.adminUpdateEngineeringCategory}${category?._id}`}
              >
                {tCallToAction("editEngineeringCategory")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteCategoryById(category?._id)}
              className="cursor-pointer"
            >
              {tCallToAction("deleteEngineeringCategory")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
