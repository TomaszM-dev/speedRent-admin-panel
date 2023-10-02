import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; typeId: string } }
) {
  try {
    if (!params.typeId) {
      return new NextResponse("type is requierd", { status: 400 });
    }

    const type = await prismadb.type.findUnique({
      where: {
        id: params.typeId,
      },
    });

    return NextResponse.json(type);
  } catch (error) {
    console.log("[Type_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; typeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.typeId) {
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

    const type = await prismadb.type.updateMany({
      where: {
        id: params.typeId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(type);
  } catch (error) {
    console.log("[Type_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; typeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.typeId) {
      return new NextResponse("type is requierd", { status: 400 });
    }

    const type = await prismadb.type.deleteMany({
      where: {
        id: params.typeId,
      },
    });

    return NextResponse.json(type);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
