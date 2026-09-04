import { cn } from "@/lib/utils";

interface PostImagesProps {
  images: readonly string[];
  className?: string;
  onImageClick?: (index: number) => void;
}

interface ImageTileProps {
  src: string;
  index: number;
  totalImages: number;
  remainingCount: number;
  isSingle: boolean;
  className?: string;
  onImageClick?: (index: number) => void;
}


function getGridLayout(imageCount: number) {
  if (imageCount === 1) {
    return "block";
  }

  if (imageCount === 2) {
    return "grid aspect-2/1 grid-cols-2 gap-px sm:aspect-video";
  }

  if (imageCount === 3) {
    return "grid aspect-3/2 grid-cols-2 grid-rows-2 gap-px sm:aspect-video";
  }

  return "grid aspect-3/2 grid-cols-2 grid-rows-2 gap-px sm:aspect-video";
}

function ImageTile({
  src,
  index,
  totalImages,
  remainingCount,
  isSingle,
  className,
  onImageClick,
}: ImageTileProps) {
  const showRemainingCount = index === 3 && remainingCount > 0;

  const imageContent = (
    <>
      <img
        src={src}
        alt={`Post image ${index + 1} of ${totalImages}`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn(
          "block transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.025]",
          isSingle
            ? "max-h-[560px] w-full object-cover"
            : "h-full w-full object-cover",
        )}
      />

      {showRemainingCount && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-[2px]"
        >
          <span className="text-3xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-4xl">
            +{remainingCount}
          </span>
        </div>
      )}
    </>
  );

  const tileClassName = cn(
    "group relative min-h-0 overflow-hidden bg-slate-100 dark:bg-slate-900",
    className,
  );

  if (onImageClick) {
    return (
      <button
        type="button"
        onClick={() => onImageClick(index)}
        aria-label={`Open post image ${index + 1} of ${totalImages}`}
        className={cn(
          tileClassName,
          "block w-full cursor-pointer text-left outline-none",
          "focus-visible:z-10 focus-visible:ring-2",
          "focus-visible:ring-inset focus-visible:ring-sky-500",
        )}
      >
        {imageContent}
      </button>
    );
  }

  return <div className={tileClassName}>{imageContent}</div>;
}



function getTileLayout(imageCount: number, index: number) {
  if (imageCount === 3 && index === 0) {
    return "row-span-2";
  }

  return undefined;
}

export default function PostImages({
  images,
  className,
  onImageClick,
}: PostImagesProps) {
  const validImages = images.filter(
    (image) => typeof image === "string" && image.trim().length > 0,
  );

  if (validImages.length === 0) {
    return null;
  }

  const visibleImages = validImages.slice(0, 4);
  const remainingCount = Math.max(validImages.length - 4, 0);
  const visibleCount = visibleImages.length;
  const isSingle = visibleCount === 1;

  return (
  <div
    role="group"
    aria-label={`Post images, ${validImages.length} total`}
    className={cn(
      "mt-3 overflow-hidden ",
      "border border-sky-200/90",
      "bg-sky-200/80",
      "shadow-[0_4px_16px_-8px_rgba(14,165,233,0.35)]",
      "ring-1 ring-sky-100/70",
      "dark:border-sky-800/80",
      "dark:bg-sky-900/70",
      "dark:ring-sky-950",
      getGridLayout(visibleCount),
      className,
    )}
  >
    {visibleImages.map((image, index) => (
      <ImageTile
        key={`${image}-${index}`}
        src={image}
        index={index}
        totalImages={validImages.length}
        remainingCount={remainingCount}
        isSingle={isSingle}
        className={getTileLayout(visibleCount, index)}
        onImageClick={onImageClick}
      />
    ))}
  </div>
);
}