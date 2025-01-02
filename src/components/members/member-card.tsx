import { Card, CardFooter, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import { calculateAge } from "@/lib/utils";

interface Props {
  member: Member;
}

export function MemberCard({ member }: Props) {
  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed
        alt={member.name}
        src={member.image || "/images/user.png"}
        className="aspect-square object-cover"
        width={300}
      />
      <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
