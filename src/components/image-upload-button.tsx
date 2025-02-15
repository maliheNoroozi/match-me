"use client";

import { addMemberPhoto } from "@/actions/user";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter } from "next/navigation";
import { HiPhoto } from "react-icons/hi2";
import { toast } from "react-toastify";

export function ImageUploadButton() {
  const router = useRouter();

  const onUploadImage = async (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === "success" &&
      result.info &&
      typeof result.info === "object"
    ) {
      const { public_id, secure_url } = result.info;
      await addMemberPhoto(secure_url, public_id);
      router.refresh();
    } else {
      toast.error("Problem adding image");
    }
  };

  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint="/api/sign-image"
      uploadPreset="match-me"
      className={`flex items-center gap-2 border-2 border-default text-default 
        rounded-lg py-2 px-4 hover:bg-default/10 w-fit`}
    >
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  );
}
