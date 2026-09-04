import PostImages from "../post-image";

type PostContentProps = {
  caption: string;
  images: string[];
};

export function PostContent({ caption, images }: PostContentProps) {
  if (!caption && images.length === 0) return null;

  return (
    <section aria-label="Post content">
      {caption ? (
        <div className="px-4 py-4 sm:px-5 sm:py-5">
          <p className="wrap-break-word whitespace-pre-wrap text-[15px] leading-6 text-slate-800 dark:text-slate-200">
            {caption}
          </p>
        </div>
      ) : null}

      {images.length > 0 ? <PostImages images={images} /> : null}
    </section>
  );
}
