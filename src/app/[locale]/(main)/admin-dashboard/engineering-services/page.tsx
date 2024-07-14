import ServiceList from "@/containers/dashboard/service-list";
import { getEngineeringServiceList } from "@/queries/engineering-service";

const page = async () => {
  const data = await getEngineeringServiceList();
  return (
    <>
      <ServiceList data={data} />
    </>
  );
};

export default page;
