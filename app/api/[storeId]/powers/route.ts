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

    const { value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!value) {
      return new NextResponse("Name is required", { status: 400 });
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

    const power = await prismadb.power.create({
      data: { value, storeId: params.storeId },
    });

    return NextResponse.json(power);
  } catch (error) {
    console.log("[power_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const powers = await prismadb.power.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(powers);
  } catch (error) {
    console.log("[power_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
