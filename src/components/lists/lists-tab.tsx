"use client";

import { Key, useTransition } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Member } from "@prisma/client";
import { Loading } from "@/components/loading";
import { MemberCard } from "../members/member-card";

interface Props {
  members: Member[];
  likeIds: string[] | undefined;
}

const tabs = [
  {
    key: "source",
    title: "Members I have liked",
  },
  {
    key: "target",
    title: "Members that like me",
  },
  {
    key: "mutual",
    title: "Mutual likes",
  },
];

export function ListsTab({ members, likeIds }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (key: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathname}?${params}`);
    });
  };

  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs
        aria-label="lists tab"
        color="default"
        onSelectionChange={handleTabChange}
        items={tabs}
      >
        {tabs.map((item) => (
          <Tab key={item.key} title={item.title}>
            {isPending ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                {members?.map((member) => {
                  const isMemberLiked = likeIds
                    ? likeIds.includes(member.userId)
                    : false;

                  return (
                    <MemberCard
                      key={member.id}
                      member={member}
                      isMemberLiked={isMemberLiked}
                    />
                  );
                })}
              </div>
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
