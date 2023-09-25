import prismadb from "@/lib/prismadb";
import React from "react";
import { BrandClient } from "./components/client";

import { format } from "date-fns";
import { BrandColumn } from "./components/columns";

const BrandPage = async ({ params }: { params: { storeId: string } }) => {
  const brands = await prismadb.brand.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatBrands: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-6">
        <BrandClient data={formatBrands} />
      </div>
    </div>
  );
};

export default BrandPage;
