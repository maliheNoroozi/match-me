import Link from "next/link";
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, Button } from "@nextui-org/react";
import { NavLink } from "./nav-link";

const links = [
  { label: "Matches", href: "/matches" },
  { label: "Lists", href: "/lists" },
  { label: "Members", href: "/members" },
];

export function TopNav() {
  return (
    <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-600"
      classNames={{
        item: [
          "text-xl",
          "text-white",
          "uppercase",
          "data-[active=true]:text-yellow-200",
        ],
      }}
    >
      <NavbarBrand>
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/images/logo.png"
            width={64}
            height={64}
            alt="match-me-logo"
          />
          <span className="font-bold text-3xl text-gray-200">MatchMe</span>
        </Link>
      </NavbarBrand>
      <NavbarContent>
        {links.map((link) => (
          <NavLink key={link.label} href={link.href} label={link.label} />
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          as={Link}
          href="/login"
          variant="bordered"
          className="text-white"
        >
          Login
        </Button>
        <Button
          as={Link}
          href="/register"
          variant="bordered"
          className="text-white"
        >
          Register
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
