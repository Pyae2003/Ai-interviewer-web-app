import ViewDetailQuestionPage from "@/features/admin/questions/components/view-detail-question-page";

type Props = {
    params: Promise<{ id: string }>
}
const page = async ({ params }: Props) => {

    const resolvedParams = await params;
    const mainId = resolvedParams.id;
    return (
        <div>
            <ViewDetailQuestionPage id={mainId} />
        </div>
    )
}

export default page