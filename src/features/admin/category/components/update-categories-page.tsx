import { UpdateCategoryForm } from "./update-categories-form";
import { getCategoryById } from "../query/get-category";

type UpdateCategoryPageProp = {
    id : string
}

const UpdateCategoryPage = async ({id} : UpdateCategoryPageProp) => {
  const category = await getCategoryById({ id });
  if (!category.data) return null;

  return (
    <div>
      <UpdateCategoryForm category={category.data} />
    </div>
  );
};

export default UpdateCategoryPage;
