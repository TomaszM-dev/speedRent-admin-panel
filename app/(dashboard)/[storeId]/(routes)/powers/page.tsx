import prismadb from "@/lib/prismadb";
import React from "react";

import { format } from "date-fns";
import { PowerColumn } from "./components/columns";
import { PowerClient } from "./components/client";

const PowerPage = async ({ params }: { params: { storeId: string } }) => {
  const powers = await prismadb.power.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedPowers: PowerColumn[] = powers.map((item) => ({
    id: item.id,
    value: item.value,

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-6">
        <PowerClient data={formattedPowers} />
      </div>
    </div>
  );
};

export default PowerPage;
