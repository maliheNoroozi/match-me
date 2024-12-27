import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "./lib/schemas/login";
import { getUserByEmail } from "./actions/auth";
import { compare } from "bcryptjs";
import { urls } from "./lib/urls";

const providers = [
  Credentials({
    id: "credentials",
    name: "credentials",
    async authorize(credentials) {
      const validatedCredentials = loginSchema.safeParse(credentials);

      if (validatedCredentials.error) return null;

      const { email, password } = validatedCredentials.data;
      const user = await getUserByEmail(email);
      if (!user || !(await compare(password, user.passwordHash!))) return null;

      return user;
    },
  }),
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  Github({
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers,
  pages: { signIn: urls.signIn, signOut: urls.signUp },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export const providersMap = providers
  .filter((provider) => provider.id !== "credentials")
  .map((provider) => {
    const providerData = typeof provider === "function" ? provider() : provider;
    return { id: providerData.id, name: providerData.name };
  });
