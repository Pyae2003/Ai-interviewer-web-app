import UpdateCategoryGroupsPage from "@/features/admin/categoryGroup/components/update-category-groups-page";

type Props = {
    params: Promise<{ id: string }>
}
const page = async ({ params }: Props) => {

    const resolvedParams = await params;
    const mainId = resolvedParams.id;
    return (
        <div>
            <UpdateCategoryGroupsPage id={mainId} />
        </div>
    )
}

export default page