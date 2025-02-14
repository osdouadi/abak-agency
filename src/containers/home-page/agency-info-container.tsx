"use client";

import AgencyInfoCard from "@/components/global/agency-info-card";
import CustomMap from "@/components/ui/Map";
import { agencyInfo } from "@/lib/data";
import { APIProvider } from "@vis.gl/react-google-maps";
import Image from "next/image";
import React from "react";

const AgencyInfoContainer = () => {
  return (
    <section className="w-full flex flex-col gap-5 px-5 md:px-10 mt-7 md:mt-10">
      <div className="flex items-center flex-col md:flex-row gap-5">
        <div className="w-full md:w-[45%] h-[33rem] md:h-[30rem] relative rounded-md overflow-hidden">
          <div className="absolute w-full h-full bg-primary/85 opacity-70 top-0 bottom-0 z-20"></div>
          <Image
            src={"/assets/img4.jpg"}
            alt=""
            width={700}
            height={700}
            className="w-full h-full absolute opacity-60 z-10"
          />
          <div className="flex flex-col gap-7 absolute z-20 p-5">
            {agencyInfo.map((item, index) => (
              <AgencyInfoCard
                key={index}
                title={item.title}
                details={item.details}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-[63%] h-[25rem] md:h-[30rem] overflow-hidden">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
            <CustomMap />
          </APIProvider>
        </div>
      </div>    
    </section>
  );
};

export default AgencyInfoContainer;
