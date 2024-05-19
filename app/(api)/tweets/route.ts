import prisma from "@/prisma";
import { responseHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(_req: NextRequest, _res: NextResponse) => {
  try {
    await prisma.$connect();
    const tweets = await prisma.tweet.findMany();
    return responseHandler.successHandler(tweets);
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};
