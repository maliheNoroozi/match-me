"use client";

import { MessageDto } from "@/types";
import { MessageBox } from "./message-box";
import { useCallback, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

interface Props {
  chatId: string;
  initialMessages: MessageDto[];
}

export function MessageList({ chatId, initialMessages }: Props) {
  const [messages, setMessages] = useState<MessageDto[]>(initialMessages);

  const handleNewMessage = useCallback((newMessage: MessageDto) => {
    setMessages((previousMessages) => [...previousMessages, newMessage]);
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);

    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
    };
  }, [handleNewMessage, chatId]);

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
