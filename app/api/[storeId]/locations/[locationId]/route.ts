import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; locationId: string } }
) {
  try {
    if (!params.locationId) {
      return new NextResponse("location is requierd", { status: 400 });
    }

    const location = await prismadb.location.findUnique({
      where: {
        id: params.locationId,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("[location_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; locationId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.locationId) {
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

    const location = await prismadb.location.updateMany({
      where: {
        id: params.locationId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("[location_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; locationId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.locationId) {
      return new NextResponse("location is requierd", { status: 400 });
    }

    const location = await prismadb.location.deleteMany({
      where: {
        id: params.locationId,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
