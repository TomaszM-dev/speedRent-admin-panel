import prismadb from "@/lib/prismadb";

import { ProductForm } from "../components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const brands = await prismadb.brand.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const locations = await prismadb.location.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const types = await prismadb.type.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const rates = await prismadb.rate.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          types={types}
          brands={brands}
          locations={locations}
          rates={rates}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
