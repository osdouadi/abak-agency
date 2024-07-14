"use client";
import SlikyItem from "@/components/global/sliky-item";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const GallerySection = () => {
  return (
    <section className="w-full overflow-hidden md:mt-16" dir="ltr">
      <Marquee loop={0} className="w-full flex relative h-[17rem]" >
        <SlikyItem>
          <Image
            src={"/assets/img1.jpg"}
            alt=""
            width={400}
            height={400}
            className="h-full rounded-lg"
          />
        </SlikyItem>
        <SlikyItem>
          <Image
            src={"/assets/img2.jpg"}
            alt=""
            width={400}
            height={400}
            className="h-full rounded-lg"
          />
        </SlikyItem>
        <SlikyItem>
          <Image
            src={"/assets/img3.jpg"}
            alt=""
            width={400}
            height={400}
            className="h-full rounded-lg"
          />
        </SlikyItem>
        <SlikyItem>
          <Image
            src={"/assets/img4.jpg"}
            alt=""
            width={400}
            height={400}
            className="h-full rounded-lg"
          />
        </SlikyItem>
        <SlikyItem>
          <Image
            src={"/assets/img5.jpg"}
            alt=""
            width={400}
            height={400}
            className="h-full rounded-lg"
          />
        </SlikyItem>
      </Marquee>
    </section>
  );
};

export default GallerySection;
