import prisma from "@/prisma";
import * as bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { CustomError, responseHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, _res: NextResponse) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return responseHandler.customHandler(
        ["name is required", "email is required", "password is required"],
        400
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.$connect();
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });
    return responseHandler.customHandler("User Registered Successfully", 201, user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return responseHandler.serverErrorHandler(new CustomError("Email already exists", 409));
    }
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};
