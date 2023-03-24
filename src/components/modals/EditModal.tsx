import Input from "../Input";
import Modal from "../Modal";

import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import useCurrentUser from "@/hooks/useCurrentUser";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";

const EmptyModal = () => {
  const { status } = useSession();

  return <>{status === "authenticated" && <EditModal />}</>;
};

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

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        disabled={loading}
        value={profileImage}
        label="Upload Profile Image."
        onChange={(image) => setProfileImage(image)}
      />
      <ImageUpload
        disabled={loading}
        value={coverImage}
        label="Upload Cover Image."
        onChange={(image) => setCoverImage(image)}
      />
      <Input
        value={name}
        placeholder="Name"
        disabled={loading}
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        value={username}
        placeholder="User Name"
        disabled={loading}
        onChange={(event) => setUsername(event.target.value)}
      />
      <Input
        value={bio}
        placeholder="Bio"
        disabled={loading}
        onChange={(event) => setBio(event.target.value)}
      />
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={editModal.isOpen}
      title="Edit Your Profile"
      actionLabel="Update"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EmptyModal;
