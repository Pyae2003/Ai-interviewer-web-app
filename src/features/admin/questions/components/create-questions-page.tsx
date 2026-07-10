import { getAllCategories } from "../../category/query/get-categories"
import { CreateQuestionForm } from "./create-questions-form";

const CreateQuestionPage =async () => {
    const categories = await getAllCategories();
  return (
        <section className="space-y-6">
      {categories.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">
            No Categories Found
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Please create a category before adding questions.
          </p>
        </div>
      ) : (
          <CreateQuestionForm categories={categories}/>
      )}
    </section>
  )
}

export default CreateQuestionPage