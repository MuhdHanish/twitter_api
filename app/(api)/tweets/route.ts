import prisma from "@/prisma";
import { CustomError, responseHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(_req: NextRequest, _res: NextResponse) => {
  try {
    await prisma.$connect();
    const tweets = await prisma.tweet.findMany({ include: { User: true } });
    return responseHandler.successHandler(tweets);
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async(req: NextRequest, _res: NextResponse) => {
  try {
    const { tweet, userId } = await req.json();
    if (!tweet || !userId) {
      return responseHandler.customHandler(
        ["tweet is required", "userId is required"],
        400
      );
    }
    await prisma.$connect();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new CustomError("User not found for the given ID", 404);
    }
    const createdTweet = await prisma.tweet.create({
      data: { tweet, userId }
    });
    return responseHandler.customHandler("Tweet Created Successfully", 201, createdTweet);
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};
