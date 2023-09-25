import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; rateId: string } }
) {
  try {
    if (!params.rateId) {
      return new NextResponse("rate is requierd", { status: 400 });
    }

    const rate = await prismadb.rate.findUnique({
      where: {
        id: params.rateId,
      },
    });

    return NextResponse.json(rate);
  } catch (error) {
    console.log("[rate_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; rateId: string } }
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

    if (!params.rateId) {
      return new NextResponse("Store id is requierd", { status: 400 });
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

    const rate = await prismadb.rate.updateMany({
      where: {
        id: params.rateId,
      },
      data: {
        value,
      },
    });

    return NextResponse.json(rate);
  } catch (error) {
    console.log("[rate_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; rateId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.rateId) {
      return new NextResponse("rate is requierd", { status: 400 });
    }

    const rate = await prismadb.rate.deleteMany({
      where: {
        id: params.rateId,
      },
    });

    return NextResponse.json(rate);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
