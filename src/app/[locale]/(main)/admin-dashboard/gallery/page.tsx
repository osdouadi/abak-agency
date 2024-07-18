import ProjectImageList from "@/containers/dashboard/image-list";
import { getGallery } from "@/queries/gallery";

const page = async () => {
  const data = await getGallery();
  return (
    <>
      <ProjectImageList data={data} />
    </>
  );
};

export default page;
