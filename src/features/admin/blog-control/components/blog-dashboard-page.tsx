
import { requireAdminPage } from "@/lib/auth-access";

import { allBlogs } from "../query/all-blogs";
import AdminBlogsPage from "./blog-dashboard";




export default async function BlogDashboardPage() {
  await requireAdminPage();

  const result = await allBlogs();

  if (!result.success) {
    throw new Error("Unable to load blogs.");
  }

  const blogs = result?.data ?? [];

  return <AdminBlogsPage blogs={blogs}  />;
}
