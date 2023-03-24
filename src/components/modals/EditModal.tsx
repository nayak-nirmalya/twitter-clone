import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import useCurrentUser from "@/hooks/useCurrentUser";

import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useCallback, useEffect, useState } from "react";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    setBio(currentUser?.bio);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setCoverImage(currentUser?.coverImage);
    setProfileImage(currentUser?.profileImage);
  }, [
    currentUser?.bio,
    currentUser?.name,
    currentUser?.username,
    currentUser?.coverImage,
    currentUser?.profileImage
  ]);

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await axios.patch("/api/edit", {
        name,
        bio,
        username,
        profileImage,
        coverImage
      });
      mutateFetchedUser();

      toast.success("Updated!");

      editModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  }, [
    bio,
    name,
    username,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser
  ]);

  return <div>EditModal</div>;
};

export default EditModal;
