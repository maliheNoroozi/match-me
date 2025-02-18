"use client";

import {
  Avatar,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { MessageDto } from "@/types";
import { Key, useCallback } from "react";
import { useMessages } from "@/hooks/useMessages";
import { truncateString } from "@/lib/utils";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";

interface Props {
  initialMessages: MessageDto[];
  nextCursor?: string;
}

export function MessageTable({ initialMessages, nextCursor }: Props) {
  const { columns, isOutbox, isDeleting, messages, handleMessageDelete } =
    useMessages(initialMessages, nextCursor);

  const renderCell = useCallback(
    (message: MessageDto, columnKey: Key) => {
      const cellValue = message[columnKey as keyof MessageDto];

      switch (columnKey) {
        case "senderName":
        case "recipientName":
          return (
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar
                alt="image of member"
                src={
                  (isOutbox ? message.recipientImage : message.senderImage) ||
                  "/images/user.png"
                }
              />
              <span>{cellValue}</span>
            </div>
          );
        case "text":
          return (
            <p className="text-bold text-sm capitalize">
              {truncateString(cellValue, 80)}
            </p>
          );
        case "created":
          return cellValue;
        default:
          return (
            <Button
              isIconOnly
              variant="light"
              onPress={() => handleMessageDelete(message)}
              isLoading={isDeleting.id === message.id && isDeleting.loading}
            >
              <AiFillDelete size={24} className="text-danger" />
            </Button>
          );
      }
    },
    [isOutbox, isDeleting.id, isDeleting.loading, handleMessageDelete]
  );

  return (
    <Card>
      <Table
        aria-label="Table with messages"
        selectionMode="single"
        shadow="none"
        className="flex flex-col gap-3 h-[80vh] overflow-auto"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              width={column.key === "text" ? "50%" : undefined}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={messages}
          emptyContent={"No messages for this container"}
        >
          {(item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer"
              as={Link}
              href={`/members/${
                isOutbox ? item?.recipientId : item?.senderId
              }/chat`}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
