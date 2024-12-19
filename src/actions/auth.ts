"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/register";
import { LoginSchema } from "@/lib/schemas/login";
import type { User } from "@prisma/client";
import type { ActionResult } from "@/types";

export const signIn = async (data: LoginSchema) => {};

export async function signOut() {}

export async function signUp(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  const validatedData = registerSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      status: "error",
      error: validatedData.error.errors,
    };
  }

  const existingUser = await getUserByEmail(validatedData.data.email);

  if (existingUser) {
    return { status: "error", error: "User already exists." };
  }

  const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

  const { name, email } = validatedData.data;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });

  return { status: "success", data: user };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}
