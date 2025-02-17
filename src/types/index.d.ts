import type { ZodIssue } from "zod";
import { Member, Message, Prisma } from "@prisma/client";

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: ZodIssue[] | string };

type MessageDto = {
  id: string;
  text: string;
  created: string;
  dateRead: string | null;
  senderId?: string;
  senderName?: string;
  senderImage?: string | null;
  recipientId?: string;
  recipientName?: string;
  recipientImage?: string | null;
};

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
    id;
    text;
    created;
    dateRead;
    sender: {
      select: {
        userId;
        name;
        image;
      };
    };
    recipient: {
      select: {
        userId;
        name;
        image;
      };
    };
  };
}>;
