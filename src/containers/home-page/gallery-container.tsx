import React from "react";
import GalleryList from "@/components/site/gallery/gallery-list";
import { getGallery } from "@/queries/gallery";

const GalleryContainer = async () => {
  let galleryData = [];
  let isLoading = true;
  let error = null;
  try {
    galleryData = await getGallery();
  } catch (err: any) {
    error = err.message;
  } finally {
    isLoading = false;
  }
  return (
    <section className="w-full overflow-hidden md:mt-8" dir="ltr">
      <GalleryList
        galleryData={galleryData}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};

export default GalleryContainer;
