import prismadb from "@/lib/prismadb";
import { auth, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";

const Nav = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-10">
        <StoreSwitcher items={stores} />

        <MainNav className="mx-6" />
        <div className="ml-auto items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
