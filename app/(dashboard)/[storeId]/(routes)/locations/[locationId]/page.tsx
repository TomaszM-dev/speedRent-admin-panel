import prismadb from "@/lib/prismadb";
import React from "react";
import { LocationForm } from "../components/location-form";

const LocationPage = async ({ params }: { params: { locationId: string } }) => {
  console.log(params);

  const location = await prismadb.location.findUnique({
    where: {
      id: params.locationId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LocationForm initialData={location} />
      </div>
    </div>
  );
};

export default LocationPage;
