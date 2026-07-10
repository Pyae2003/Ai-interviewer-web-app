"use server"

import { getAllCategoryGroups } from '../../categoryGroup/query/get-all-category-groups'
import { CreateCategoriesForm } from './create-categories-form'

const CreateCategoriesPage = async() => {

  const categoriesGroup = await getAllCategoryGroups();

  

  return (
     <section className="space-y-6">
          {!categoriesGroup.data ? (
            <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">
                No Categories Found
              </h3>
    
              <p className="mt-2 text-sm text-zinc-500">
                Please create a category before adding questions.
              </p>
            </div>
          ) : (
            <CreateCategoriesForm groups={categoriesGroup.data.data} />
          )}
        </section>
  )
}

export default CreateCategoriesPage