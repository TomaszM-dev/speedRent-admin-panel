"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns, PowerColumn } from "./columns";
import ApiList from "@/components/ui/api-list";

interface PowerClientProps {
  data: PowerColumn[];
}

export const PowerClient: React.FC<PowerClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  console.log(data);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Powers (${data.length})`}
          description="Menage powers for you store"
        ></Heading>
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/powers/new`);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="value" columns={columns} data={data} />
      <Heading title="API" description="Api calls for Powers" />
      <ApiList entityName="powers" entitityIdName="powerId" />
    </>
  );
};
