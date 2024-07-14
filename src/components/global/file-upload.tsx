"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadThing";

type Props = {
  apiEndpoint:
    | "serviceIcon"
    | "serviceBanner"
    | "categoryIcon"
    | "categoryBanner"
    | "galleryImage"
    | "blogImage";
  onChange: (url?: string) => void;
  value?: string;
};

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const fileType = value?.split(".").pop();

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {fileType !== "pdf" ? (
          <div className="relative w-44 h-44">
            <Image
              src={value}
              alt="uploaded image"
              className="object-fill w-full h-full"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-primary hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button onClick={() => onChange("")} variant="ghost" type="button">
          <X className="h-4 w-4" />
          حذف الصورة
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        className="ut-button:bg-primary ut-label:text-primary cursor-pointer"
      />
    </div>
  );
};

export default FileUpload;
