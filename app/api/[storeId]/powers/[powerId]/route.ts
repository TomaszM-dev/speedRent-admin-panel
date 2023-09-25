import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; powerId: string } }
) {
  try {
    if (!params.powerId) {
      return new NextResponse("power is requierd", { status: 400 });
    }

    const power = await prismadb.power.findUnique({
      where: {
        id: params.powerId,
      },
    });

    return NextResponse.json(power);
  } catch (error) {
    console.log("[power_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; powerId: string } }
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

    if (!params.powerId) {
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

    const power = await prismadb.power.updateMany({
      where: {
        id: params.powerId,
      },
      data: {
        value,
      },
    });

    return NextResponse.json(power);
  } catch (error) {
    console.log("[power_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; powerId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.powerId) {
      return new NextResponse("power is requierd", { status: 400 });
    }

    const power = await prismadb.power.deleteMany({
      where: {
        id: params.powerId,
      },
    });

    return NextResponse.json(power);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
