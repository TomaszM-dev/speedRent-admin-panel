import prismadb from "@/lib/prismadb";
import React from "react";
import { TypeForm } from "../components/type-form";

const TypePage = async ({ params }: { params: { typeId: string } }) => {
  console.log(params);

  const type = await prismadb.type.findUnique({
    where: {
      id: params.typeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TypeForm initialData={type} />
      </div>
    </div>
  );
};

export default TypePage;
