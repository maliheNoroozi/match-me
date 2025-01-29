"use client";

import { toggleLikeMember } from "@/actions/like";
import { MouseEvent } from "react";
import { AiFillHeart } from "react-icons/ai";

interface Props {
  targetId: string;
  isMemberLiked?: boolean;
}

export function LikeButton({ targetId, isMemberLiked = false }: Props) {
  const toggleLike = async (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    await toggleLikeMember(targetId, isMemberLiked);
  };

  return (
    <div
      onClick={toggleLike}
      className="hover:opacity-80 transition cursor-pointer"
    >
      <AiFillHeart
        size={24}
        className={isMemberLiked ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}
