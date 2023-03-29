import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

import Avatar from "../Avatar";
import LikeItem from "./LikeItem";

import useLoginModal from "@/hooks/useLoginModal";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";

interface PostItemProps {
  post: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ post, userId }) => {
  const router = useRouter();
  const { status } = useSession();
  const loginModal = useLoginModal();

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
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                cursor-pointer 
                font-semibold 
                text-white 
                hover:underline
              "
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
          <div
            className="
              mt-1 max-w-xs 
              text-white 
              transition 
              md:max-w-lg 
              lg:max-w-2xl
            "
          >
            {post.body}
          </div>
          <div className="mt-3 flex flex-row items-center gap-10">
            {/* COMMENTS */}
            <div
              className="
                    flex
                    cursor-pointer
                    flex-row
                    items-center
                    gap-2
                    text-neutral-500
                    transition
                    hover:text-sky-500
                "
            >
              <AiOutlineMessage size={20} />
              <p>{post.comments?.length || 0}</p>
            </div>

            {/* LIKES */}
            {status === "authenticated" ? (
              <LikeItem post={post} userId={userId} />
            ) : (
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  loginModal.onOpen();
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
                <AiOutlineHeart size={20} />
                <p>{post.likedIds?.length || 0}</p>
              </div>
            )}

            {/* EDIT */}
            {status === "authenticated" && <EditItem post={post} />}

            {/* DELETE */}
            {status === "authenticated" && (
              <DeleteItem post={post} userId={userId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
