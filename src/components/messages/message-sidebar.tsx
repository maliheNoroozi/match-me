"use client";

import { MessageContainer } from "@/types";
import { Card, Chip } from "@nextui-org/react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";

export function MessageSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [container, setContainer] = useState(
    searchParams.get("container") || "inbox"
  );

  const items = [
    {
      key: "inbox" as MessageContainer,
      label: "Inbox",
      icon: GoInbox,
      chip: true,
    },
    {
      key: "outbox" as MessageContainer,
      label: "Outbox",
      icon: MdOutlineOutbox,
      chip: false,
    },
  ];

  const handleSelect = (key: MessageContainer) => {
    setContainer(key);
    const params = new URLSearchParams(searchParams);
    params.set("container", key.toString());
    router.replace(`${pathname}?${params}`);
  };

  const unreadCount = 2;

  return (
    <Card>
      {items.map(({ key, chip, icon: Icon, label }) => (
        <div
          key={key}
          className={clsx(
            "flex flex-row items-center rounded-t-lg gap-2 p-3 cursor-pointer",
            {
              "text-default font-semibold": container === key,
              "text-black hover:text-default/70": container !== key,
            }
          )}
          onClick={() => handleSelect(key)}
        >
          <Icon />
          <div className="flex justify-between flex-grow">
            <span>{label}</span>
            {chip && <Chip>{unreadCount}</Chip>}
          </div>
        </div>
      ))}
    </Card>
  );
}
