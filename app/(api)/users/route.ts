import { responseHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = (_req: NextRequest, _res: NextResponse) => {
  try {
    return responseHandler.successHandler();
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  }
};
