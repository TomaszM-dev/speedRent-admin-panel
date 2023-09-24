"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { TypeColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface TypeClientProps {
  data: TypeColumn[];
}

export const TypeClient: React.FC<TypeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  console.log(data);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Types (${data.length})`}
          description="Menage types for you store"
        ></Heading>
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/types/new`);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Api calls for Types" />
      <ApiList entityName="types" entitityIdName="typeId" />
    </>
  );
};
