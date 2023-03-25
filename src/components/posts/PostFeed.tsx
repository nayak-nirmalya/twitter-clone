import React from "react";

import PostItem from "./PostItem";
import usePosts from "@/hooks/usePosts";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} post={post} userId={userId} />
      ))}
    </>
  );
};

export default PostFeed;
