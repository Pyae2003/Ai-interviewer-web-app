import CreateQuestionPage from "@/features/admin/questions/components/create-questions-page";
export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className="w-full ">
      <CreateQuestionPage />
    </div>
  );
};

export default page;
