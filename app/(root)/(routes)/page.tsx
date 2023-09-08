"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { store } from "@/hooks/store";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const onOpen = store((state) => state.onOpen);
  const isOpen = store((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
}
