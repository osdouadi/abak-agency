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

import { deleteImage } from "@/queries/gallery";
import { Image } from "@/types/image";
import { formatDate } from "@/lib/utils";
import { constants } from "@/config/constants";

export const imageColumns: ColumnDef<Image>[] = [
  {
    accessorKey: "title.ar",
    header: "imageTitle",
  },
  {
    accessorKey: "isDisabled",
    header: "imageStatus",
  },
  {
    accessorKey: `createdAt`,
    header: "imageCreatedAt",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    header: "actions",
    id: "actions",
    cell: ({ row }) => {
      const image = row.original;
      const router = useRouter();
      const tResponse = useTranslations("responses")
      const tCallToAction = useTranslations("callToAction");
      const { toast } = useToast();

      const handleDeleteImageById = async (imageId: string) => {
        try {
          await deleteImage(imageId);
          router.refresh();
          toast({
            title: tResponse("imageDeletedSuccessfully"),
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: tResponse("failedToDeleteImages"),
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
              <Link href={`${constants.links.adminUpdateImage}${image.id}`}>
                {tCallToAction("editImage")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteImageById(image?.id)}
              className="cursor-pointer"
            >
              {tCallToAction("deleteImage")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
