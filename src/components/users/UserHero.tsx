import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";

import Image from "next/image";
import React from "react";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="relative h-44 bg-neutral-700">
        {fetchedUser?.coverImage && (
          <Image
            fill
            priority
            alt={"Cover Image"}
            src={fetchedUser.coverImage}
            style={{
              objectFit: "cover"
            }}
          />
        )}
        <div
          className="
                absolute
                -bottom-12
                left-4
            "
        >
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
