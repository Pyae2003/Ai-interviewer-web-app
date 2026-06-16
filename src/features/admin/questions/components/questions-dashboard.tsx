import { getCategoryWithQuestions } from "../query/get-categoryWithQuestion";
import QuestionsList from "./questions-list";

type QuestionDashboardProp = {
    categoryId: string;
};

const QuestionsDashboard = async ({
    categoryId,
}: QuestionDashboardProp) => {
    const category = await getCategoryWithQuestions(categoryId);

    if (!category) {
        return (
            <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
                <h2 className="text-lg font-semibold text-red-600">
                    Category Not Found
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    The requested category does not exist.
                </p>
            </div>
        );
    }

    const questions = category.data.questions ?? [];

    return (
        <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 text-center">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                    {category.data.name}
                </h1>

                {category.data.description && (
                    <p className="text-sm text-muted-foreground">
                        {category.data.description}
                    </p>
                )}
            </div>

            {/* Empty State */}
            {questions.length === 0 ? (
                <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
                    <h3 className="text-lg font-semibold">
                        No Questions Found
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Create your first interview question.
                    </p>
                </div>
            ) : (
                <QuestionsList question={category.data}/>
            )}
        </section>
    );
};

export default QuestionsDashboard;