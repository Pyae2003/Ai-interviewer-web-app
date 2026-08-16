import ViewDetailCategoryGroupPage from "@/features/admin/categoryGroup/components/view-detail-category-groups-page";

type Props = {
    params: Promise<{ id: string }>
}
const page = async ({ params }: Props) => {

    const resolvedParams = await params;
    const mainId = resolvedParams.id;
    return (
        <div>
            <ViewDetailCategoryGroupPage  id={mainId} />
        </div>
    )
}

export default page