"use client";

type PostDetailContentProps = {
  caption: string;
  images: string[];
};

export function PostDetailContent({ caption, images }: PostDetailContentProps) {
  return (
    <div className="mt-4">
      {/* Caption */}
      {caption ? (
        <div className="px-5 pb-4">
          <p className="whitespace-pre-wrap break-words text-[15px] leading-6 text-slate-800 dark:text-slate-200">
            {caption}
          </p>
        </div>
      ) : null}

      {/* Images */}
      {images.length > 0 ? (
        <div className={images.length === 1 ? "" : "grid grid-cols-2 gap-1"}>
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className={
                images.length === 1 ? "max-h-[600px]" : "aspect-square"
              }
            >
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
