import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

import React from "react";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  return <div>UserBio</div>;
};

export default UserBio;
