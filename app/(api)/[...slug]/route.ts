import { NextRequest, NextResponse } from "next/server";
import { responseHandler } from "../";

export const GET = (_req: NextRequest, _res: NextResponse) => {
  return responseHandler.notFoundHandler();
};

export const POST = (_req: NextRequest, _res: NextResponse) => {
  return responseHandler.notFoundHandler();
};

export const PUT = (_req: NextRequest, _res: NextResponse) => {
  return responseHandler.notFoundHandler();
};

export const DELETE = (_req: NextRequest, _res: NextResponse) => {
  return responseHandler.notFoundHandler();
};
