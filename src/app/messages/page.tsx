import { getMessagesByContainer } from "@/actions/message";
import { MessageSidebar } from "@/components/messages/message-sidebar";
import { MessageTable } from "@/components/messages/message-table";
import { MessageContainer } from "@/types";

interface Props {
  searchParams: Promise<{ container: MessageContainer }>;
}

export default async function MessagesPage({ searchParams }: Props) {
  const { container = "inbox" } = await searchParams;
  const { messages } = await getMessagesByContainer(container);

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">
        <MessageTable initialMessages={messages} />
      </div>
    </div>
  );
}
