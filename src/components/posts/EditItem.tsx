import React, { useCallback } from "react";
import { AiOutlineEdit } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import usePostEditModal from "@/hooks/usePostEditModal";

interface EditItemProps {
  post: Record<string, any>;
}

const EditItem: React.FC<EditItemProps> = ({ post }) => {
  const { data: currentUser } = useCurrentUser();
  const postEditModal = usePostEditModal();

  const onEdit = useCallback(
    (event: any) => {
      event.stopPropagation();
      postEditModal.setPostId(post.id);
      postEditModal.onOpen();
    },
    [post.id, postEditModal]
  );

  return (
    <div
      onClick={onEdit}
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
