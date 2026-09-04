import { notFound } from "next/navigation";

import { PostDetailPage } from "./detail-post-page";
import { getPostById } from "../query/get-post-by-id";

type PostDetailMainPageProps = {
    id: string;
};

const PostDetailMainPage = async ({
  id,
}: PostDetailMainPageProps) => {

  const result = await getPostById(id);

  if (!result || !result.data) {
    notFound();
  }

  const post = result.data;

  return (
    <PostDetailPage
      post={post}
      currentUser={post.author}
    />
  );
};

export default PostDetailMainPage;