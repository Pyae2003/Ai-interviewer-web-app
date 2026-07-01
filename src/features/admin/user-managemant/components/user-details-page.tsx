"use server";
import { getUserDetail } from "../actions/user-detail";
import UserDetails from "./user-details";

type UserDetailPageProp = {
  userId: string;
};
const UserDetailPage = async ({ userId }: UserDetailPageProp) => {
  const user = await getUserDetail({ userId });
  return (
    <div>
      <UserDetails
        id={user.data.id}
        name={user.data.name}
        email={user.data.email}
        role={user.data.role}
        status={user.data.status}
        joinedAt={user.data.joinedAt}
        lastLogin={user.data.lastLogin}
        interviews={user.data.interviews}
        avgScore={user.data.avgScore}
        passed={user.data.passed}
        failed={user.data.failed}
        banned={user.data.banned}
        recentInterviews={user.data.recentInterviews}
      />
    </div>
  );
};

export default UserDetailPage;
