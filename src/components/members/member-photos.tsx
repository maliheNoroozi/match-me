"use client";

import { Photo } from "@prisma/client";
import { DeleteButton } from "../DeleteButton";
import { StarButton } from "../StarButton";
import { useState } from "react";
import { MemberPhoto } from "./member-photo";
import { deleteMemberPhoto, setMemberMainPhoto } from "@/actions/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  photos: Photo[] | null;
  isEditing?: boolean;
  mainImageUrl?: string | null;
}

export const MemberPhotos = ({
  photos,
  isEditing = false,
  mainImageUrl,
}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState({
    id: "",
    type: "",
    isLoading: false,
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;

    setLoading({
      id: photo.id,
      type: "main",
      isLoading: true,
    });

    try {
      await setMemberMainPhoto(photo);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading({
        id: "",
        type: "",
        isLoading: false,
      });
    }
  };

  const onDelete = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;

    setLoading({
      id: photo.id,
      type: "delete",
      isLoading: true,
    });

    try {
      await deleteMemberPhoto(photo);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading({
        id: "",
        type: "",
        isLoading: false,
      });
    }
  };

  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <MemberPhoto photo={photo} />
            {isEditing && (
              <>
                <StarButton
                  selected={photo.url === mainImageUrl}
                  loading={
                    loading.isLoading &&
                    loading.type === "main" &&
                    loading.id === photo.id
                  }
                  clickHandler={() => onSetMain(photo)}
                />
                <DeleteButton
                  loading={
                    loading.isLoading &&
                    loading.type === "delete" &&
                    loading.id === photo.id
                  }
                  clickHandler={() => onDelete(photo)}
                />
              </>
            )}
          </div>
        ))}
    </div>
  );
};
