import { getMemberByUserId } from "@/actions/members";
import { MemberSidebar } from "@/components/members/member-sidebar";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  params: Promise<{ userId: string }>;
  children: ReactNode;
}

export default async function Layout({ children, params }: Props) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = `/members/${member.userId}`;
  const navLinks = [
    { name: "Profile", href: `${basePath}` },
    {
      name: "Photos",
      href: `${basePath}/photos`,
    },
    { name: "Chat", href: `${basePath}/chat` },
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
