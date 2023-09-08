import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./main-nav";

const Nav = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>Store swither</div>
        <MainNav className="mx-6" />
        <div className="ml-auto items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
