import useUser from "@/hooks/useUser";

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
            ${hasBorder ? "border-4 border-black" : ""}
            ${isLarge ? "h-32" : "h-12"}
            ${isLarge ? "w-32" : "w-12"}
            relative
            cursor-pointer
            rounded-full
            transition
            hover:opacity-90
        `}
    >
      <Image
        fill
        priority
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        style={{
          objectFit: "cover",
          borderRadius: "100%"
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || `/images/placeholder.png`}
      />
    </div>
  );
};

export default Avatar;
