import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      brandId,
      typeId,
      locationId,
      rateId,
      powerId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!typeId) {
      return new NextResponse("type is required", { status: 400 });
    }
    if (!brandId) {
      return new NextResponse("brand is required", { status: 400 });
    }
    if (!locationId) {
      return new NextResponse("location is required", { status: 400 });
    }
    if (!powerId) {
      return new NextResponse("power is required", { status: 400 });
    }
    if (!rateId) {
      return new NextResponse("rate is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        isArchived,
        isFeatured,
        brandId,
        locationId,
        powerId,
        typeId,
        rateId,
        categoryId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const typeId = searchParams.get("typeId") || undefined;
    const brandId = searchParams.get("brandId") || undefined;
    const powerId = searchParams.get("powerId") || undefined;
    const locationId = searchParams.get("locationId") || undefined;
    const rateId = searchParams.get("rateId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        typeId,
        brandId,
        powerId,
        locationId,
        rateId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        type: true,
        brand: true,
        power: true,
        location: true,
        rate: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
