"use server";

import { prisma } from "@/lib/prisma";
import { MessageSchema, messageSchema } from "@/lib/schemas/message";
import { ActionResult, MessageContainer, MessageDto } from "@/types";
import { getAuthUserId } from "./auth";
import { mapMessageToMessageDto } from "@/lib/mappings";

interface FormData extends MessageSchema {
  recipientId: string;
}

export async function createMessage(
  formData: FormData
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { text, recipientId } = formData;
    const verifiedMessage = messageSchema.safeParse({ text });
    if (!verifiedMessage.success) {
      return { status: "error", error: verifiedMessage.error.errors };
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId: userId,
        recipientId,
        text: verifiedMessage.data.text,
      },
      select: messageSelect,
    });

    const messageToReturn = mapMessageToMessageDto(newMessage);

    return { status: "success", data: messageToReturn };
  } catch (error) {
    return {
      status: "error",
      error: "Something went wrong while creating the message.",
    };
  }
}

export async function getMessageThread(
  recipientId: string
): Promise<MessageDto[]> {
  try {
    const userId = await getAuthUserId();
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: messageSelect,
    });

    const messagesToReturn = messages.map((message) =>
      mapMessageToMessageDto(message)
    );

    return messagesToReturn;
  } catch (error) {
    throw error;
  }
}

// TODO, Add pagination
export async function getMessagesByContainer(
  container?: MessageContainer | null
) {
  try {
    const userId = await getAuthUserId();
    const messages = await prisma.message.findMany({
      where: {
        [container === "inbox" ? "recipientId" : "senderId"]: userId,
        [container === "inbox" ? "recipientDeleted" : "senderDeleted"]: false,
      },
      orderBy: {
        created: "desc",
      },
      select: messageSelect,
    });

    const messagesToReturn = messages.map((message) =>
      mapMessageToMessageDto(message)
    );

    return { messages: messagesToReturn, nextCursor: undefined };
  } catch (error) {
    throw error;
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  try {
    const newMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        [isOutbox ? "senderDeleted" : "recipientDeleted"]: true,
      },
    });

    if (
      newMessage.senderDeleted === true &&
      newMessage.recipientDeleted === true
    ) {
      await prisma.message.delete({
        where: { id: messageId },
      });
    }
  } catch (error) {
    throw error;
  }
}

export async function getUnreadMessageCount() {
  try {
    const userId = await getAuthUserId();

    return prisma.message.count({
      where: {
        recipientId: userId,
        dateRead: null,
        recipientDeleted: false,
      },
    });
  } catch (error) {
    throw error;
  }
}

const messageSelect = {
  id: true,
  text: true,
  created: true,
  dateRead: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};
