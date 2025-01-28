import { getMemberPhotosByUserId } from "@/actions/members";
import { CardInnerWrapper } from "@/components/card-inner-wrapper";
import { Image } from "@nextui-org/react";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function MemberPhotos({ params }: Props) {
  const { userId } = await params;
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <CardInnerWrapper
      header="Photos"
      body={
        <div className="grid grid-cols-5 gap-3">
          {(photos || []).map((photo) => (
            <Image
              key={photo.id}
              src={photo.url || "/images/user.png"}
              alt="Member image"
              width={200}
              height={200}
              className="object-cover aspect-square"
            />
          ))}
        </div>
      }
    />
  );
}
