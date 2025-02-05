"use client";

import { Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { MdStar } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface Props {
  photo: Photo;
}

export const EditPhoto = ({ photo }: Props) => {
  const starMemberPhoto = () => {};
  const deleteMemberPhoto = () => {};

  return (
    <div className="relative">
      <Image
        key={photo.id}
        src={photo.url || "/images/user.png"}
        alt="Member image"
        width={200}
        height={200}
        className="object-cover aspect-square"
      />
      <MdStar
        className="fill-yellow-500 absolute top-3 left-3 z-50 size-7 cursor-pointer"
        onClick={starMemberPhoto}
      />
      <MdDelete
        className="fill-red-500 absolute top-3 right-5 z-50 size-7 cursor-pointer"
        onClick={deleteMemberPhoto}
      />
    </div>
  );
};
