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
