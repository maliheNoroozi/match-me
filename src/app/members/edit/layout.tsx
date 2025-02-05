import { getAuthUserId } from "@/actions/auth";
import { getMemberByUserId } from "@/actions/members";
import { MemberSidebar } from "@/components/members/member-sidebar";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = "/members/edit";
  const navLinks = [
    { name: "Edit profile", href: `${basePath}/profile` },
    {
      name: "Upload photos",
      href: `${basePath}/photos`,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-5 pt-10 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9">
        <Card className="h-full w-full p-3">{children}</Card>
      </div>
    </div>
  );
}
