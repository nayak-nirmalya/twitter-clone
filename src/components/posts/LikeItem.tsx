import React, { useCallback } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import useLike from "@/hooks/useLike";
import useCurrentUser from "@/hooks/useCurrentUser";

interface LikeItemProps {
  post: Record<string, any>;
  userId?: string;
}

const LikeItem: React.FC<LikeItemProps> = ({ post, userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({
    postId: post.id,
    userId
  });

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      toggleLike();
    },
    [toggleLike]
  );

  return (
    <div
      onClick={onLike}
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
      {hasLiked ? (
        <AiFillHeart size={20} color={hasLiked ? "red" : ""} />
      ) : (
        <AiOutlineHeart size={20} />
      )}
      <p>{post.likedIds?.length || 0}</p>
    </div>
  );
};

export default LikeItem;
