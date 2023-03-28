import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useMemo } from "react";

import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useLoginModal";
import useCurrentUser from "./useCurrentUser";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success(hasLiked ? "Removed Like!" : "Liked!");
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    }
  }, [
    postId,
    hasLiked,
    loginModal,
    currentUser,
    mutateFetchedPost,
    mutateFetchedPosts
  ]);

  return {
    hasLiked,
    toggleLike
  };
};

export default useLike;
