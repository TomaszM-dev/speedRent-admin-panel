import React from "react";
import { BillboardClient } from "./components/client";

const BillboardsPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardsPage;
