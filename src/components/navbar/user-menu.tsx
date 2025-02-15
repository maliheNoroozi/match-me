"use client";

import { signOutUser } from "@/actions/auth";
import { urls } from "@/lib/urls";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import type { User } from "next-auth";
import Link from "next/link";

interface Props {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserMenu({ user }: Props) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={user.image || "/images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        variant="flat"
        disabledKeys={["profile"]}
      >
        <DropdownSection showDivider>
          <DropdownItem
            key="profile"
            isReadOnly
            as="span"
            aria-label="email"
            className="h-14 gap-2 opacity-100"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key="edit-profile" as={Link} href={urls.profile}>
          Edit profile
        </DropdownItem>
        <DropdownItem
          key="sign-out"
          color="danger"
          onPress={async () => signOutUser()}
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
