import { getAuthUserId } from "@/actions/auth";
import { getMemberByUserId } from "@/actions/members";
import { CardInnerWrapper } from "@/components/card-inner-wrapper";
import { MemberEditForm } from "@/components/members/member-edit-form";
import { notFound } from "next/navigation";

export default async function MemberEditPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  return (
    <CardInnerWrapper
      header="Edit Profile"
      body={<MemberEditForm member={member} />}
    />
  );
}
