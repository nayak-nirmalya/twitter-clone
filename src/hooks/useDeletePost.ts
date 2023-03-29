import axios from "axios";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import usePost from "./usePost";
import usePosts from "./usePosts";

const useDeletePost = ({
  postId,
  userId
}: {
  postId: string;
  userId?: string;
}) => {
  const router = useRouter();
  const { asPath } = useRouter();

  const { mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const deletePost = useCallback(async () => {
    try {
      const request = () => axios.delete("/api/delete", { data: { postId } });

      await request();

      if (asPath.startsWith("/posts/")) {
        router.back();
      } else {
        mutateFetchedPost();
        mutateFetchedPosts();
      }

      toast.success("Tweet Deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    }
  }, [asPath, router, postId, mutateFetchedPost, mutateFetchedPosts]);

  return {
    deletePost
  };
};

export default useDeletePost;
