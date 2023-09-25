import prismadb from "@/lib/prismadb";
import React from "react";
import { LocationClient } from "./components/client";

import { format } from "date-fns";
import { LocationColumn } from "./components/columns";

const LocationPage = async ({ params }: { params: { storeId: string } }) => {
  const locations = await prismadb.location.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedLocations: LocationColumn[] = locations.map((item) => ({
    id: item.id,
    name: item.name,

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-6">
        <LocationClient data={formattedLocations} />
      </div>
    </div>
  );
};

export default LocationPage;
