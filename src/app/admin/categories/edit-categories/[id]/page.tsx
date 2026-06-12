import UpdateCategoryPage from '@/features/admin/category/components/update-categories-page'

type parmasProp = {
    params : Promise<{id : string}>
}
const page = async ({params} : parmasProp) => {
    const resolvedParams = await params;
    const mainId = resolvedParams.id;
  return (
    <div>
        <UpdateCategoryPage id={mainId} />
    </div>
  )
}

export default page