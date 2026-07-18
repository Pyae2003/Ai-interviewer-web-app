"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Trash2, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateReactHelpers } from "@uploadthing/react";

import { UploadRouter } from "@/app/api/uploadthing/core";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const { useUploadThing } = generateReactHelpers<UploadRouter>();

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  const { startUpload, isUploading } = useUploadThing("profileImage", {
    onClientUploadComplete: (files) => {
      if (!files?.length) return;

      onChange(files[0].url);

      toast.success("Profile image uploaded.");
    },

    onUploadError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;

    await startUpload([files[0]]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    setDragActive(false);

    await handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={cn(
          "cursor-pointer rounded-xl border-2 border-dashed p-6 transition-all",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        )}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <Upload className="h-8 w-8 text-muted-foreground" />

          <h3 className="font-medium">
            Upload Profile Image
          </h3>

          <p className="text-sm text-muted-foreground">
            Click or drag your image here
          </p>

          <p className="text-xs text-muted-foreground">
            PNG, JPG, WEBP (Max 4MB)
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Preview */}

      {value && (
        // <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border shadow">
        //   <Image
        //     src={value}
        //     alt="Profile"
        //     fill
        //     className="object-cover"
        //   />

          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute right-2 top-2 h-8 w-8 rounded-full"
            onClick={() => onChange("")}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        // </div>
      )}

      {/* Browse Button */}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          "Choose Image"
        )}
      </Button>
    </div>
  );
}