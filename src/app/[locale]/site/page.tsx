import CategoryContainer from "../../../containers/home-page/categories-container";
import HeroContainer from "../../../containers/home-page/hero-container";
import GalleryContainer from "../../../containers/home-page/gallery-container";
import ConsultingSection from "../../../containers/home-page/consulting-container";
import BlogsSection from "./sections/home/blogs-section";
import AgencyInfoSection from "./sections/home/agency-info-section";

export default function Home() {
  return (
    <>
      <HeroContainer />
      <CategoryContainer />
      <GalleryContainer />
      <ConsultingSection />
      <BlogsSection />
      {/*      
    
    
      <AgencyInfoSection /> */}
    </>
  );
}
