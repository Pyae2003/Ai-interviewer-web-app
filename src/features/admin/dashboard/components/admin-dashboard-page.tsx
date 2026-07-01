import { getDashboardStats } from "../actions/get-dashboard-stats";
import { getTopCategoriesFn } from "../actions/get-top-categories";
import { recentInterviewsFn } from "../actions/recent-interviews";
import AdminDashboard from "./admin-dashborad"

const AdminDashboardPage = async() => {

    const stats = await getDashboardStats();
    const recentInterviews = await recentInterviewsFn();
    const getTopCategories = await getTopCategoriesFn();

  return (
    <div>
        <AdminDashboard result={stats.data} recentInterviews={recentInterviews.data} topCategories={getTopCategories.data}  />
    </div>
  )
}

export default AdminDashboardPage