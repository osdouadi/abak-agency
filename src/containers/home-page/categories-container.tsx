import CategoryList from "@/components/site/category/category-list";
import CategorySectionTop from "@/components/site/category/category-header-group";
import { getEnginneringCategoryList } from "@/queries/engineering-category";

const CategoryContainer= async () => {
  let categoryData = [];
  let isLoading = true;
  let error = null;
  try {
    categoryData = await getEnginneringCategoryList();
  } catch (err: any) {
    error = err.message;
  } finally {
    isLoading = false;
  }

  return (
    <section className="flex justify-center items-center flex-col text-center gap-4 md:mt-16 px-4 md:px-10">
      <CategorySectionTop />
      <div className="flex flex-col md:flex-row justify-center items-center gap-7 md:gap-14">
        <CategoryList
          categories={categoryData}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </section>
  );
};

export default CategoryContainer;
