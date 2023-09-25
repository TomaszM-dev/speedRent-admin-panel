import prismadb from "@/lib/prismadb";
import React from "react";
import { RateClient } from "./components/client";

import { format } from "date-fns";
import { RateColumn } from "./components/columns";

const RatePage = async ({ params }: { params: { storeId: string } }) => {
  const rates = await prismadb.rate.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedRates: RateColumn[] = rates.map((item) => ({
    id: item.id,
    value: item.value,

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-6">
        <RateClient data={formattedRates} />
      </div>
    </div>
  );
};

export default RatePage;
