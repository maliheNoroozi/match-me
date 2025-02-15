import { getMemberPhotosByUserId } from "@/actions/members";
import { CardInnerWrapper } from "@/components/card-inner-wrapper";
import { MemberPhotos } from "@/components/members/member-photos";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function MemberPhotosPage({ params }: Props) {
  const { userId } = await params;
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <CardInnerWrapper header="Photos" body={<MemberPhotos photos={photos} />} />
  );
}
