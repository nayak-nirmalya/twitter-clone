import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

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

  return <div>{comment.id}</div>;
};

export default CommentItem;
