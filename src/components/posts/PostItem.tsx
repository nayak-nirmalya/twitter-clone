import { useRouter } from "next/router";
import React, { useCallback } from "react";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

interface PostItemProps {
  post: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ post, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${post.user.id}`);
    },
    [router, post.user.id]
  );

  return <div>PostItem</div>;
};

export default PostItem;
