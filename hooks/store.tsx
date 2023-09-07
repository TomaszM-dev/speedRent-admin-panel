import { create } from "zustand";

interface storeInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const store = create<storeInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
