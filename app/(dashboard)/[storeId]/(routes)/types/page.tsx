import prismadb from "@/lib/prismadb";
import React from "react";
import { TypeClient } from "./components/client";

import { format } from "date-fns";
import { TypeColumn } from "./components/columns";

const TypesPage = async ({ params }: { params: { storeId: string } }) => {
  const types = await prismadb.type.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTypes: TypeColumn[] = types.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-6">
        <TypeClient data={formattedTypes} />
      </div>
    </div>
  );
};

export default TypesPage;
