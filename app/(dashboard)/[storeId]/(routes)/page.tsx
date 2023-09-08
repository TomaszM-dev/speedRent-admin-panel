import Nav from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import React from "react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <div>
      <Nav />
      <h1>Active Store: {store?.name}</h1>
    </div>
  );
};

export default DashboardPage;
