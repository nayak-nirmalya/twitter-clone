import Input from "../Input";
import Modal from "../Modal";

import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import usePostEditModal from "@/hooks/usePostEditModal";

import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useCallback, useEffect, useState } from "react";

const PostEditModal: React.FC = () => {
  const postEditModal = usePostEditModal();
  const postId = postEditModal.postId;
  const { mutate: mutatePosts } = usePosts();
  const { data: fetchedPost, mutate: mutatePost } = usePost(postId);

  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPostBody(fetchedPost?.body);
  }, [fetchedPost?.body]);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await axios.patch("/api/editPost", {
        data: {
          postId,
          postBody
        }
      });

      mutatePost();
      mutatePosts();

      toast.success("Tweet Updated!");

      postEditModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  }, [postId, postBody, postEditModal, setLoading, mutatePost, mutatePosts]);

  const bodyContent = (
    <div className="flex flex-col">
      {postBody && (
        <Input
          value={postBody}
          placeholder="Edit Tweet"
          disabled={loading}
          onChange={(event) => {
            event.stopPropagation();
            setPostBody(event.target.value);
          }}
        />
      )}
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
