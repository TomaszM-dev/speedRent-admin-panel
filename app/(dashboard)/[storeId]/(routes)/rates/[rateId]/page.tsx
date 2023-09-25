import prismadb from "@/lib/prismadb";
import React from "react";
import { RateForm } from "../components/rate-form";

const RatePage = async ({ params }: { params: { rateId: string } }) => {
  console.log(params);

  const rate = await prismadb.rate.findUnique({
    where: {
      id: params.rateId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RateForm initialData={rate} />
      </div>
    </div>
  );
};

export default RatePage;
