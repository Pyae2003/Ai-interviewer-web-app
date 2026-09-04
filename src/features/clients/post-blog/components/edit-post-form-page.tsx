import { notFound } from "next/navigation";

import { getPostById } from "../query/get-post-by-id";
import { EditPostForm } from "./edit-post-form";

type EditPostFormPageProps = Readonly<{
  id: string;
}>;

export default async function EditPostFormPage({
  id,
}: EditPostFormPageProps) {
  const postId = id.trim();

  if (!postId) {
    notFound();
  }

  const result = await getPostById({ postId });

  if (!result || !result.data) {
    notFound();
  }

  return (
    <main className="min-h-svh bg-muted/30 px-4 py-8 sm:px-6">
      <section
        aria-labelledby="edit-post-heading"
        className="mx-auto w-full max-w-2xl"
      >
        <header className="mb-6">
          <h1
            id="edit-post-heading"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Edit Post
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your post information and save the changes.
          </p>
        </header>

        <EditPostForm post={result.data.data} />
      </section>
    </main>
  );
}