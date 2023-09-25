import prismadb from "@/lib/prismadb";
import React from "react";
import { PowerForm } from "../components/power-form";

const PowerPage = async ({ params }: { params: { powerId: string } }) => {
  console.log(params);

  const power = await prismadb.power.findUnique({
    where: {
      id: params.powerId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PowerForm initialData={power} />
      </div>
    </div>
  );
};

export default PowerPage;
