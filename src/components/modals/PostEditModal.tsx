import Input from "../Input";
import Modal from "../Modal";

import usePosts from "@/hooks/usePosts";
import usePostEditModal from "@/hooks/usePostEditModal";

import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useCallback, useEffect, useState } from "react";
import usePost from "@/hooks/usePost";

interface PostEditModalProps {
  postId: string;
}

const PostEditModal: React.FC<PostEditModalProps> = ({ postId }) => {
  const postEditModal = usePostEditModal();
  const { mutate: mutatePosts } = usePosts();
  const { data: fetchedPost, mutate: mutatePost } = usePost(postId);

  const [post, setPost] = useState("");

  useEffect(() => {
    setPost(fetchedPost?.body);
  }, [fetchedPost?.body]);

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await axios.patch("/api/edit", {
        post
      });
      mutatePost();
      mutatePosts();

      toast.success("Updated!");

      postEditModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  }, [post, postEditModal, mutatePost, mutatePosts]);

  const bodyContent = (
    <div className="flex flex-col">
      <Input
        value={post}
        placeholder="Tweet"
        disabled={loading}
        onChange={(event) => setPost(event.target.value)}
      />
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={postEditModal.isOpen}
      title="Edit Your Tweet"
      actionLabel="Update Tweet"
      onClose={postEditModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default PostEditModal;
