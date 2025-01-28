"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getMembers() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  try {
    return prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getMemberByUserId(userId: string) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  try {
    return prisma.member.findUnique({
      where: {
        userId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getMemberPhotosByUserId(userId: string) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  try {
    const member = await prisma.member.findUnique({
      where: { userId },
      select: { photos: true },
    });

    if (!member) {
      return null;
    }

    return member.photos.map((item) => ({ id: item.id, url: item.url }));
  } catch (error) {
    throw error;
  }
}

export async function getMemberChatsByUserId(userId: string) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  try {
    const member = await prisma.member.findUnique({
      where: { userId },
    });

    if (!member) {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
