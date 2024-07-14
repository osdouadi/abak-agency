import ProjectImageList from "@/containers/dashboard/image-list";
import { getGallery } from "@/queries/gallery";

const page = async () => {
  const galleryData = await getGallery();
  return (
    <>
      <ProjectImageList galleryData={galleryData} />
    </>
  );
};

export default page;
