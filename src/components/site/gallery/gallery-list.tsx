"use client";

import { SkeletonCard } from "@/components/global/skeleton-card";
import SlikyItem from "@/components/global/sliky-item";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

type GalleryImage = {
  id: string;
  title: string;
  galleryImage: string;
  isDisabled: boolean;
};

type GalleryImageListProps = {
  galleryData: GalleryImage[];
  isLoading: boolean;
  error: any;
};

const GalleryImageList = ({
  galleryData,
  isLoading,
  error,
}: GalleryImageListProps) => {
  return (
    <Marquee loop={0} className="w-full flex relative h-[17rem]">
      {isLoading ? (
        <div className="flex items-center gap-5 flex-col md:flex-row">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : error ? (
        <div>Somthing went wrong</div>
      ) : (
        galleryData
          .filter((filteredItem: GalleryImage) => !filteredItem.isDisabled)
          .map((item: GalleryImage, index: number) => (
            <SlikyItem key={index}>
              <img
                src={item?.galleryImage}
                alt=""
                className="h-full rounded-lg"
              />
            </SlikyItem>
          ))
      )}
    </Marquee>
  );
};

export default GalleryImageList;
