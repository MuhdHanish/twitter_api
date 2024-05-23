import prisma from "@/prisma";
import { CustomError, responseHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

type TRequestParams = {
  id: string;
};


export const GET = async (_req: NextRequest,  { params }: { params: TRequestParams }, _res: NextResponse) => {
  try {
    const { id } = params;
    await prisma.$connect();
    const tweet = await prisma.tweet.findUnique({ where: { id }, include: { User: true } });
    return responseHandler.successHandler(tweet);
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: NextRequest,  { params }: { params: TRequestParams }, _res: NextResponse) => {
  try {
    const { id } = params;
    const { tweet, userId } = await req.json();
    if (!tweet) {
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
    const updatedTweet = await prisma.tweet.update({
      where: { id },
      data: { tweet }
    });
    return responseHandler.customHandler(
      "Tweet Updated Successfully",
      200,
      updatedTweet
    );
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (_req: NextRequest, { params }: { params: TRequestParams }, _res: NextResponse) => {
  try {
    const { id } = params;
    await prisma.$connect();
    const deletedTweet = await prisma.tweet.delete({ where: { id } });
    return responseHandler.customHandler(
      "Tweet Deleted Successfully",
      200,
      deletedTweet
    );
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};
