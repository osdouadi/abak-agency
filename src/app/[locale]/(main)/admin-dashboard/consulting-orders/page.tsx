import ConsultingOrderList from "@/containers/dashboard/consulting-order-list";
import { getConsultingOrdersList } from "@/queries/consulting-order";

const page = async () => {
  const data = await getConsultingOrdersList();
  return (
    <>
      <ConsultingOrderList data={data} />
    </>
  );
};

export default page;
