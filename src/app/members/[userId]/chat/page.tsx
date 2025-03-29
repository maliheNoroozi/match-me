import { getAuthUserId } from "@/actions/auth";
import { getMessageThread } from "@/actions/message";
import { CardInnerWrapper } from "@/components/card-inner-wrapper";
import { ChatForm } from "@/components/messages/chat-form";
import { MessageList } from "@/components/messages/message-list";
import { createChatId } from "@/lib/utils";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function MemberChat({ params }: Props) {
  const { userId } = await params;
  const loggedInUser = await getAuthUserId();
  const messages = await getMessageThread(userId);
  const chatId = createChatId(userId, loggedInUser);

  return (
    <CardInnerWrapper
      header="Chat"
      body={<MessageList initialMessages={messages} chatId={chatId} />}
      footer={<ChatForm />}
    />
  );
}
