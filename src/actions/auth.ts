"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/register";
import { LoginSchema } from "@/lib/schemas/login";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import type { User } from "@prisma/client";
import type { ActionResult } from "@/types";
import { urls } from "@/lib/urls";

export const signInUser = async (
  provider: "credentials" | "google" | "github",
  data?: LoginSchema,
  redirect?: boolean,
  redirectTo?: string
): Promise<ActionResult<string>> => {
  try {
    await signIn(provider, {
      ...data,
      redirect: redirect ?? false,
      redirectTo: redirectTo ?? "",
    });
    return { status: "success", data: "User successfully logged in." };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { status: "error", error: "Invalid credentials." };
      }

      return { status: "error", error: error.message };
    }

    return { status: "error", error: "Something went wrong." };
  }
};

export async function signOutUser() {
  await signOut({ redirectTo: urls.signIn });
}

export async function signUpUser(
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
