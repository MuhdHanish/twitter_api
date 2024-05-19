import prisma from "@/prisma";
import { responseHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(_req: NextRequest, _res: NextResponse) => {
  try {
    await prisma.$connect();
    const users = await prisma.user.findMany();
    return responseHandler.successHandler(users);
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};
