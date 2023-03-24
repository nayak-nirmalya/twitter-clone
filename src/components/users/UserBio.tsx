import { format } from "date-fns";
import React, { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { useSession } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from "../Button";

interface UserProps {
  userId: string;
}

const EditButton: React.FC<UserProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      {currentUser?.id === userId && (
        <Button secondary label="Edit" onClick={() => {}} />
      )}
    </>
  );
};

const UserBio: React.FC<UserProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  const { status } = useSession();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) return null;

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {status === "authenticated" ? (
          <EditButton userId={userId} />
        ) : (
          <Button onClick={() => {}} label="Follow" secondary />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-white">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div
            className="
              mt-4
              flex
              flex-row
              items-center
              gap-2
              text-neutral-500
            "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
