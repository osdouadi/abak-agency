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
import { constants } from "@/config/constants";
import { Order } from "@/types/order";
import { deleteConsultingOrder } from "@/queries/consulting-order";

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "fullName",
    header: "clientName",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: `createdAt`,
    header: "orderCreatedAt",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    header: "actions",
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const router = useRouter();
      const tResponse = useTranslations("responses");
      const tCallToAction = useTranslations("callToAction");
      const { toast } = useToast();

      const handleDeleteOrderById = async (orderId: string) => {
        try {
          await deleteConsultingOrder(orderId);
          router.refresh();
          toast({
            title: tResponse("orderDeletedSuccessfully"),
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: tResponse("failedToDeleteOrder"),
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
                href={`${constants.links.adminViewConsultingOrder}${order.id}`}
              >
                {tCallToAction("viewOrder")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteOrderById(order?.id)}
              className="cursor-pointer"
            >
              {tCallToAction("deleteOrder")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
