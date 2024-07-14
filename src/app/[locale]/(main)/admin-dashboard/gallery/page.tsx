import ProjectImageList from "@/containers/dashboard/project-image-list";
import { getProjectImageList } from "@/queries/project-image";

const page = async () => {
  const data = await getProjectImageList();
  return (
    <>
      <ProjectImageList data={data} />
    </>
  );
};

export default page;
