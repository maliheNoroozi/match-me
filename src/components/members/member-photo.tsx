import { CldImage } from "next-cloudinary";
import { Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import clsx from "clsx";

type Props = {
  photo: Photo | null;
};

export function MemberPhoto({ photo }: Props) {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className={clsx("rounded-2xl")}
          priority
        />
      ) : (
        <Image src={photo?.url || "/images/user.png"} alt="Image of user" />
      )}
    </div>
  );
}
