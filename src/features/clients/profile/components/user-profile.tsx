import { getCategoryGroupSelection } from "../query/get-category-group-selections";
import { getProfileHeader } from "../query/get-profile-header";
import { getRecentActivity } from "../query/get-recent-interviews";
import CategoryGroupSection from "./category-group-selection";
import ProfileHeader from "./profile-header";
import RecentActivity from "./recent-activity";
import RecommendationCard from "./recommanded-card";


export default async function ProfilePage() {
  const profile = await getProfileHeader();
  const recentActivityInfo = await getRecentActivity();
  const categoryGroups = await getCategoryGroupSelection();
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <ProfileHeader {...profile.data} />

      <RecentActivity items={recentActivityInfo.data} />

      <CategoryGroupSection groups={categoryGroups.data} />

      <RecommendationCard />
    </div>
  );
}