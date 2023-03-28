import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "../Avatar";

interface CommentItemProps {
  comment: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${comment.user.id}`);
    },
    [router, comment.user.id]
  );

  const createdAt = useMemo(() => {
    if (!comment?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(comment?.createdAt));
  }, [comment?.createdAt]);

  return (
    <div
      className="
            border-p-[1px]
            cursor-pointer
            border-neutral-800
            p-5
            transition
            hover:bg-neutral-900
        "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={comment.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="cursor-pointer font-semibold text-white hover:underline"
            >
              {comment.user.name}
            </p>
            <span
              className="
                    hidden 
                    cursor-pointer 
                    text-neutral-500 
                    hover:underline 
                    md:block
                "
            >
              @{comment.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="mt-1 text-white">{comment.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
