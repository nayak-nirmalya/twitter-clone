import { format } from "date-fns";
import React, { useMemo } from "react";
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
    </div>
  );
};

export default UserBio;
