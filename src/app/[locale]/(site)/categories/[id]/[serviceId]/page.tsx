import React from "react";
import ServicePageContainer from "@/containers/service-page/service-page-container";
import { getEngineeringServiceById } from "@/queries/engineering-service";

const page = async ({ params }) => {
  const id = params.serviceId;
  const data = await getEngineeringServiceById(id);
  return (
    <>
      <ServicePageContainer data={data} />
    </>
  );
};

export default page;
