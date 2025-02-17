import { getMessageThread } from "@/actions/message";
import { CardInnerWrapper } from "@/components/card-inner-wrapper";
import { ChatForm } from "@/components/messages/chat-form";
import { MessageBox } from "@/components/messages/message-box";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function MemberChat({ params }: Props) {
  const { userId } = await params;
  const messages = await getMessageThread(userId);

  const messagesBody = (
    <div className="flex-1">
      {messages.length === 0 ? (
        " No message to display"
      ) : (
        <>
          {messages.map((message) => (
            <MessageBox key={message.id} message={message} />
          ))}
        </>
      )}
    </div>
  );

  return (
    <CardInnerWrapper header="Chat" body={messagesBody} footer={<ChatForm />} />
  );
}
