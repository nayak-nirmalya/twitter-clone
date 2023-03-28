import { create } from "zustand";

interface PostEditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePostEditModal = create<PostEditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default usePostEditModal;
