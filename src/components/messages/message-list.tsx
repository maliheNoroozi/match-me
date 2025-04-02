"use client";

import { MessageDto } from "@/types";
import { MessageBox } from "./message-box";
import { useCallback, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { PusherEvents } from "@/lib/pusher-events";

interface Props {
  chatId: string;
  initialMessages: MessageDto[];
}

export function MessageList({ chatId, initialMessages }: Props) {
  const [messages, setMessages] = useState<MessageDto[]>(initialMessages);

  const handleNewMessage = useCallback((newMessage: MessageDto) => {
    setMessages((previousMessages) => [...previousMessages, newMessage]);
  }, []);

  const handleReadMessages = useCallback((messageIds: MessageDto["id"][]) => {
    setMessages((previousMessages) =>
      previousMessages.map((previousMessage) =>
        messageIds.includes(previousMessage.id)
          ? { ...previousMessage, dateRead: new Date().toISOString() }
          : previousMessage
      )
    );
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind(PusherEvents.NewMessage, handleNewMessage);
    channel.bind(PusherEvents.ReadMessages, handleReadMessages);

    return () => {
      channel.unsubscribe();
      channel.unbind(PusherEvents.NewMessage, handleNewMessage);
      channel.unbind(PusherEvents.ReadMessages, handleReadMessages);
    };
  }, [chatId]);

  return (
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
}
