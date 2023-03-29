import { create } from "zustand";

interface PostEditModalStore {
  postId: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setPostId: (postId: string) => void;
}

const usePostEditModal = create<PostEditModalStore>((set) => ({
  postId: "",
  isOpen: false,
  setPostId: (postId) => set({ postId }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default usePostEditModal;
