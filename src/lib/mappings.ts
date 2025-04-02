import { MessageDto, MessageWithSenderRecipient } from "@/types";

export function mapMessageToMessageDto(
  message: MessageWithSenderRecipient
): MessageDto {
  return {
    id: message.id,
    text: message.text,
    created: message.created.toISOString(),
    dateRead: message.dateRead ? message.dateRead.toISOString() : null,
    senderId: message.sender?.userId,
    senderName: message.sender?.name,
    senderImage: message.sender?.image,
    recipientId: message.recipient?.userId,
    recipientName: message.recipient?.name,
    recipientImage: message.recipient?.image,
  };
}
