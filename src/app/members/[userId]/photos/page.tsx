import { getMemberByUserId } from "@/actions/members";
import { CardInnerWrapper } from "@/components/card-inner-wrapper";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function MemberPhotos({ params }: Props) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  return <CardInnerWrapper header="Photos" body={member.description} />;
}
