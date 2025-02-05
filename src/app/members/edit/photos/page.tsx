import { getAuthUserId } from "@/actions/auth";
import { getMemberByUserId } from "@/actions/members";
import { ImageUploadButton } from "@/components/image-upload-button";
import { notFound } from "next/navigation";
import { EditPhoto } from "@/components/photo";
import { getMemberPhotos } from "@/actions/user";

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  const photos = await getMemberPhotos();

  return (
    <div>
      <ImageUploadButton />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
        {(photos || []).map((photo) => (
          <EditPhoto photo={photo} />
        ))}
      </div>
    </div>
  );
}
