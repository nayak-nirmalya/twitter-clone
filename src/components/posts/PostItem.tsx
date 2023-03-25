import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

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

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/posts/${post.id}`);
    },
    [router, post.id]
  );

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      loginModal.onOpen();
    },
    [loginModal]
  );

  const createdAt = useMemo(() => {
    if (!post?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(post.createdAt));
  }, [post?.createdAt]);

  return <div>PostItem</div>;
};

export default PostItem;
