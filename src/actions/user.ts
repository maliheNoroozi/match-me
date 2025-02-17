"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./auth";
import { memberSchema, MemberSchema } from "@/lib/schemas/member";
import { ActionResult } from "@/types";
import { Member, Photo } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";

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

export async function deleteMemberPhoto(photo: Photo) {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    await prisma.member.update({
      where: { userId },
      data: {
        photos: {
          delete: {
            id: photo.id,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function setMemberMainPhoto(photo: Photo) {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    await prisma.user.update({
      where: { id: userId },
      data: { image: photo.url },
    });

    return prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (error) {
    throw error;
  }
}

export async function getCurrentUserInfo() {
  try {
    const userId = await getAuthUserId();

    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        image: true,
        email: true,
      },
    });
  } catch (error) {}
}

export async function getUserInfo(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        image: true,
      },
    });
  } catch (error) {
    throw error;
  }
}
