import { getMembers } from "@/actions/members";
import { MemberCard } from "@/components/members/member-card";

export default async function MatchesPage() {
  const members = await getMembers();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 mt-10">
      {members?.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}
