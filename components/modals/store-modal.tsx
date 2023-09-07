"use client";

import { store } from "@/hooks/store";
import React from "react";
import { Modal } from "../ui/modal";

const StoreModal = () => {
  const storeModal = store();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to menage products"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future create store form
    </Modal>
  );
};

export default StoreModal;
