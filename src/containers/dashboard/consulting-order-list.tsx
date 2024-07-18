"use client";

import React from "react";

import { DataTable } from "@/components/dashboard/services/data-table";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { deleteConsultingOrderList } from "@/queries/consulting-order";
import { orderColumns } from "@/components/dashboard/data-table/order-columns";

export type ConsultingOrderListProps = {
  data: any;
};

const ConsultingOrderList: React.FC<ConsultingOrderListProps> = ({ data }) => {
  const tDashboardConsultingOrder = useTranslations(
    "dashboard.consultingOrder"
  );
  const tCallToAction = useTranslations("callToAction");
  const tResponses = useTranslations("responses");

  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteOrders = async () => {
    try {
      await deleteConsultingOrderList();
      toast({
        title: tResponses("allOrdersDeletedSuccessfully"),
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponses("failedToDeleteAllOrders"),
        description: tResponses("pleaseTryAgain"),
      });
    }
  };

  return (
    <>
      <div className="mb-7 flex justify-between items-center">
        <h2 className="md:text-3xl">
          {tDashboardConsultingOrder("consultingOrders")}
        </h2>
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <button
            onClick={() => handleDeleteOrders()}
            className="bg-primary rounded-md py-1.5 px-3 md:py-2.5 md:px-4 text-xs md:text-base flex gap-1.5"
          >
            {tCallToAction("deleteAllOrders")}
          </button>
        </div>
      </div>
      <div className="pb-2.5 flex justify-center items-center">
        <h2 className="md:text-2xl">
          {tDashboardConsultingOrder("allConsultingOrders")}
        </h2>
      </div>
      <div className="mx-auto">
        <DataTable columns={orderColumns} data={data} />
      </div>
    </>
  );
};

export default ConsultingOrderList;
