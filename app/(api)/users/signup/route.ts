import prisma from "@/prisma";
import * as bcrypt from "bcryptjs";
import { responseHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, _res: NextResponse) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return responseHandler.customHandler(
        ["name is required", "email is required", "password is required"],
        null,
        400
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.$connect();
    const { password: storedPassword, ...user } = await prisma.user.create(
      { data: { name, email, password: hashedPassword } }
    );
    return responseHandler.createHandler(user);
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};
