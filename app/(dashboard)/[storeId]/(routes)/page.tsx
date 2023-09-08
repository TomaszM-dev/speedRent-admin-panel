import Nav from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import React from "react";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <div>
      <h1>Active Store: {store?.name}</h1>
    </div>
  );
};

export default DashboardPage;
