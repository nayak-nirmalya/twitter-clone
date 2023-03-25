import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "../Avatar";

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

  return (
    <div
      onClick={goToPost}
      className="
            cursor-pointer
            border-b-[1px]
            border-neutral-800
            p-5
            transition
            hover:bg-neutral-900
        "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={post.user.id} />
        <div>
          <div
            className="
                    flex flex-row items-center gap-2
                "
          >
            <p
              onClick={goToUser}
              className="cursor-pointer font-semibold text-white hover:underline"
            >
              {post.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                    hidden 
                    cursor-pointer
                    text-neutral-500
                    hover:underline
                    md:block
                "
            >
              @{post.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="mt-1 text-white">{post.body}</div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
