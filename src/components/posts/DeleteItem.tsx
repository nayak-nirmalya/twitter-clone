import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";

interface DeleteItemProps {
  post: Record<string, any>;
  userId?: string;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ post, userId }) => {
  const { data: currentUser } = useCurrentUser();

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
      className="
        flex
        cursor-pointer
        flex-row
        items-center
        gap-2
        text-neutral-500
        transition
        hover:text-red-500
    "
    >
      {post.userId === currentUser?.id && <AiOutlineDelete size={20} />}
    </div>
  );
};

export default DeleteItem;
