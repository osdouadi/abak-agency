import CategoryContainer from "../../../containers/home-page/categories-container";
import HeroContainer from "../../../containers/home-page/hero-container";
import GalleryContainer from "../../../containers/home-page/gallery-container";
import ContactContainer from "@/containers/home-page/contact-container";
import BlogsContainer from "../../../containers/home-page/blogs-container";
import ConsultingContainer from "../../../containers/home-page/consulting-container";
import AgencyInfoContainer from "../../../containers/home-page/agency-info-container";

export default function Home() {
  return (
    <>
      <HeroContainer />
      <CategoryContainer />
      <GalleryContainer />
      <ConsultingContainer />
      <BlogsContainer />
      <AgencyInfoContainer />
      <ContactContainer />
    </>
  );
}
