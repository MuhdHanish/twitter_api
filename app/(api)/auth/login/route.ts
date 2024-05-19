import prisma from "@/prisma";
import * as bcrypt from "bcryptjs";
import { responseHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, _res: NextResponse) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return responseHandler.customHandler(
        ["email is required", "password is required"],
        400,
      );
    }
    await prisma.$connect();
    const exist  = await prisma.user.findFirst({ where: { email } });
    if (exist && await bcrypt.compare(password, exist.password)) {
      const { password: storedPassword, ...user } = exist;
      return responseHandler.customHandler("Logged In", 200, user);
    } else {
      return responseHandler.unAuthenticatedHandler("No user found with the given credentials");
    }
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};
