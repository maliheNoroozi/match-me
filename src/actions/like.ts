"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./auth";
import { revalidatePath } from "next/cache";

export async function toggleLikeMember(
  targetUserId: string,
  isMemberLiked: boolean
) {
  try {
    const userId = await getAuthUserId();

    if (isMemberLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
      });
    }

    revalidatePath("/members");
  } catch (error) {
    throw error;
  }
}

export async function fetchCurrentUserLikeIds() {
  try {
    const userId = await getAuthUserId();

    const likeIds = await prisma.like.findMany({
      where: { sourceUserId: userId },
      select: {
        targetUserId: true,
      },
    });

    return likeIds.map((item) => item.targetUserId);
  } catch (error) {}
}

export async function fetchLikeMembers(type = "source") {
  try {
    const userId = await getAuthUserId();

    switch (type) {
      case "source":
        return await fetchSourceLikes(userId);
      case "target":
        return await fetchTargetLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchSourceLikes(userId: string) {
  const targetList = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetMember: true,
    },
  });

  return targetList.map((item) => item.targetMember);
}

export async function fetchTargetLikes(userId: string) {
  const sourceList = await prisma.like.findMany({
    where: {
      targetUserId: userId,
    },
    select: {
      sourceMember: true,
    },
  });

  return sourceList.map((item) => item.sourceMember);
}

export async function fetchMutualLikes(userId: string) {
  const targetList = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetUserId: true,
    },
  });

  const targetIds = targetList.map((item) => item.targetUserId);

  const sourceList = await prisma.like.findMany({
    where: { targetUserId: userId, sourceUserId: { in: targetIds } },
    select: { sourceMember: true },
  });

  return sourceList.map((item) => item.sourceMember);
}
