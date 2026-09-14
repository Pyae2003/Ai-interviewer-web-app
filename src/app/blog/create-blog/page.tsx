import Header from "@/components/header";
import { loginPath } from "@/constants/route";
import CreatePostFormPage from "@/features/clients/post-blog/components/create-post-form-page"
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

const page = async () => {
    const session = await getSession();

    if (!session?.user?.id) {
        redirect(loginPath);
    };

    return (
        <div>
            <Header
                path={loginPath}
                user={{
                    id: session.user.id,
                    name: session.user.name ?? "User",
                    email: session.user.email ?? "",
                    image: session.user.image ?? "",
                              role:session.user.role??"",

                }}
            />
            <CreatePostFormPage />
        </div>
    )
}

export default page