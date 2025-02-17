import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Card } from "@nextui-org/react";
import { getAuthUserId } from "@/actions/auth";
import { getMemberByUserId } from "@/actions/members";
import { MemberSidebar } from "@/components/members/member-sidebar";
import { urls } from "@/lib/urls";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const navLinks = [
    { name: "Edit profile", href: urls.profile },
    { name: "Upload photos", href: urls.uploadPhotos },
  ];

  return (
    <div className="grid grid-cols-12 gap-5 pt-10 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9">
        <Card className="w-full p-3 h-[80vh]">{children}</Card>
      </div>
    </div>
  );
}
