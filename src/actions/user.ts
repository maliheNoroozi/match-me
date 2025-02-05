"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./auth";
import { memberSchema, MemberSchema } from "@/lib/schemas/member";
import { ActionResult } from "@/types";
import { Member } from "@prisma/client";

export async function addMemberPhoto(url: string, publicId: string) {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await prisma.member.update({
      where: {
        userId,
      },
      data: {
        photos: {
          create: {
            url,
            publicId,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getMemberPhotos() {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const memeber = await prisma.member.findUnique({
      where: { userId },
      select: { photos: true },
    });

    return memeber?.photos;
  } catch (error) {
    throw error;
  }
}

export async function updateMemberProfile(
  nameUpdated: boolean,
  data: MemberSchema
): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const validated = memberSchema.safeParse(data);

    if (validated.error) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, description, city, country } = validated.data;

    if (nameUpdated) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: name,
        },
      });
    }

    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        description,
        city,
        country,
      },
    });

    return { status: "success", data: member };
  } catch (error) {
    return {
      status: "error",
      error: "Something went wrong, coupld not update profile.",
    };
  }
}
