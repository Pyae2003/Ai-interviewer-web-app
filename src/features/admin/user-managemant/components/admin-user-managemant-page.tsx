"use server";

import { getAdminUserStats } from "../query/get-admin-stats";
import { getUsersInfofn } from "../query/get-users-info";

import UserManagementPage from "./admin-user-managemant";

const AdminUserManagementPage = async () => {
  const [adminStats, usersInfo] =
    await Promise.all([
      getAdminUserStats(),
      getUsersInfofn({}),
    ]);

  if (!adminStats.success) {
    throw new Error(
      "Failed to load admin stats"
    );
  }

  if (!usersInfo.success) {
    throw new Error(
      "Failed to load users"
    );
  }

  return (
    <UserManagementPage
      usersStats={adminStats.data}
      usersInfo={usersInfo.data}
    />
  );
};

export default AdminUserManagementPage;