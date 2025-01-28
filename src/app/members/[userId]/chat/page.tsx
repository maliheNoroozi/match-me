import { getMemberChatsByUserId } from "@/actions/members";
import { CardInnerWrapper } from "@/components/card-inner-wrapper";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function MemberChat({ params }: Props) {
  const { userId } = await params;
  const chats = await getMemberChatsByUserId(userId);

  return <CardInnerWrapper header="Chat" body={<div>Chats</div>} />;
}
