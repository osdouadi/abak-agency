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

import { deleteEngineeringService } from "@/queries/engineering-service";
import { formatDate } from "@/lib/utils";
import { constants } from "@/config/constants";

export interface Service {
  id: string;
  title: { ar: string; en: string };
  category: string;
  createdAt: Date;
}

export const serviceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "title.ar",
    header: "engineeringServiceTitle",
  },
  {
    accessorKey: "category.title.ar",
    header: "engineeringServiceCategory",
  },
  {
    accessorKey: `createdAt`,
    header: "engineeringServiceCreatedAt",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    header: "actions",
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;
      const router = useRouter();
      const tResponse = useTranslations("responses");
      const tCallToAction = useTranslations("callToAction");
      const { toast } = useToast();

      const handleDeleteServiceById = async (serviceId: string) => {
        try {
          await deleteEngineeringService(serviceId);
          router.refresh();
          toast({
            title: tResponse("enineeringServiceDeletedSuccessfully"),
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: tResponse("enineeringServiceDeletedSuccessfully"),
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
                href={`${constants.links.adminUpdateEngineeringService}${service?.id}`}
              >
                {tCallToAction("editEngineeringService")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteServiceById(service?.id)}
              className="cursor-pointer"
            >
              {tCallToAction("deleteEngineeringService")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
