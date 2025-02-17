"use server";

import { prisma } from "@/lib/prisma";
import { MessageSchema, messageSchema } from "@/lib/schemas/message";
import { ActionResult, MessageDto } from "@/types";
import { getAuthUserId } from "./auth";
import { Message } from "@prisma/client";
import { mapMessage } from "@/lib/mappings";

interface FormData extends MessageSchema {
  recipientId: string;
}

export async function createMessage(
  formData: FormData
): Promise<ActionResult<Message>> {
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
    });

    return { status: "success", data: newMessage };
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

    return messages.map((message) => mapMessage(message));
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
