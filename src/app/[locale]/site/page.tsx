import CategoriesSection from "../../../containers/home-page/categories-section";
import HeroSection from "../../../containers/home-page/hero-section";
import GallerySection from "./sections/home/gallery-section";
import ConsultingSection from "./sections/home/consulting-section";
import BlogsSection from "./sections/home/blogs-section";
import AgencyInfoSection from "./sections/home/agency-info-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <GallerySection />

      {/*      
      <ConsultingSection />
      <BlogsSection />
      <AgencyInfoSection /> */}
    </>
  );
}
