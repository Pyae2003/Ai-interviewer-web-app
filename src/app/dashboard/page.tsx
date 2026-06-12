import HeaderWrapper from "@/components/headerWrapper";
// import { loginPath } from "@/constants/route";
// import { getSession } from "@/lib/get-Session";
// import { redirect } from "next/navigation";

const page = async () => {
  // let session = null;

  // try {
  //   session = await getSession();
  // } catch (error) {
  //   console.error("Session error:", error);
  // }

  // if (!session) {
  //   redirect(loginPath);
  // }

  // const userId = session.user.id;

  // if (!userId) {
  //   redirect(loginPath);
  // }
  return (
    <div>
      <HeaderWrapper />
    </div>
  );
};

export default page;
