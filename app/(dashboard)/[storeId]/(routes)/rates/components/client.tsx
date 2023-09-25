"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { RateColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface RateClientProps {
  data: RateColumn[];
}

export const RateClient: React.FC<RateClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  console.log(data);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Rates (${data.length})`}
          description="Menage rates for you store"
        ></Heading>
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/rates/new`);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="value" columns={columns} data={data} />
      <Heading title="API" description="Api calls for Rates" />
      <ApiList entityName="rates" entitityIdName="rateId" />
    </>
  );
};
