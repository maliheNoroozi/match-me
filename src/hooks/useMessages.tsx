import { deleteMessage } from "@/actions/message";
import { MessageDto } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const outboxColumns = [
  { key: "recipientName", label: "Recipient" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date sent" },
  { key: "actions", label: "Actions" },
];

const inboxColumns = [
  { key: "senderName", label: "Sender" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date received" },
  { key: "actions", label: "Actions" },
];

// TODO, Add pagination
export function useMessages(
  initialMessages: MessageDto[],
  nextCursor?: string
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOutbox = searchParams.get("container") === "outbox";

  const [isDeleting, setDeleting] = useState({
    id: "",
    loading: false,
  });

  const columns = isOutbox ? outboxColumns : inboxColumns;

  const handleMessageDelete = useCallback(
    async (message: MessageDto) => {
      try {
        setDeleting({ id: message.id, loading: true });
        await deleteMessage(message.id, isOutbox);
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong deleting the message"
        );
      } finally {
        setDeleting({ id: "", loading: false });
      }
    },
    [isOutbox, router]
  );

  return {
    columns,
    isOutbox,
    isDeleting,
    deleteMessage: handleMessageDelete,
    messages: initialMessages,
  };
}
