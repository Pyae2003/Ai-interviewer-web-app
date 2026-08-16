import ViewDetailCategoryPage from "@/features/admin/category/components/view-details-category-page";

type Props = {
    params: Promise<{ id: string }>
}
const page = async ({ params }: Props) => {

    const resolvedParams = await params;
    const mainId = resolvedParams.id;
    return (
        <div>
            <ViewDetailCategoryPage  id={mainId} />
        </div>
    )
}

export default page