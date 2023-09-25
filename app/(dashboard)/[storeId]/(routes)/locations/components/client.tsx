"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { LocationColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface LocationClientProps {
  data: LocationColumn[];
}

export const LocationClient: React.FC<LocationClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  console.log(data);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Locations (${data.length})`}
          description="Menage locations for you store"
        ></Heading>
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/locations/new`);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Api calls for Locations" />
      <ApiList entityName="locations" entitityIdName="locationId" />
    </>
  );
};
