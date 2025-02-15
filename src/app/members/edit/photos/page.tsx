import { getAuthUserId } from "@/actions/auth";
import { getMemberByUserId, getMemberPhotosByUserId } from "@/actions/members";
import { ImageUploadButton } from "@/components/image-upload-button";
import { notFound } from "next/navigation";
import { CardInnerWrapper } from "@/components/card-inner-wrapper";
import { MemberPhotos } from "@/components/members/member-photos";

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <CardInnerWrapper
      header="Upload Photos"
      body={
        <>
          <ImageUploadButton />
          <MemberPhotos
            photos={photos}
            isEditing={true}
            mainImageUrl={member.image}
          />
        </>
      }
    />
  );
}
