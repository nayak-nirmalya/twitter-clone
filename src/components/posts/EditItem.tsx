import React, { useCallback } from "react";
import { AiOutlineEdit } from "react-icons/ai";

import useDeletePost from "@/hooks/useDeletePost";
import useCurrentUser from "@/hooks/useCurrentUser";

interface EditItemProps {
  post: Record<string, any>;
  userId?: string;
}

const EditItem: React.FC<EditItemProps> = ({ post, userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { deletePost } = useDeletePost({ postId: post.id, userId });

  const onDelete = useCallback(
    (event: any) => {
      event.stopPropagation();
      deletePost();
    },
    [currentUser, deletePost]
  );

  return (
    <div
      onClick={onDelete}
      className="
        flex
        cursor-pointer
        flex-row
        items-center
        gap-2
        text-neutral-500
        transition
        hover:text-green-500
    "
    >
      {post.userId === currentUser?.id && <AiOutlineEdit size={20} />}
    </div>
  );
};

export default EditItem;
