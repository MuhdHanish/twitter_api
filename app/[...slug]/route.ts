import { responseHandler } from "@/utils";

export const handleNotFound = () => {
  return responseHandler.notFoundHandler();
};

export const GET = handleNotFound;
export const POST = handleNotFound;
export const PUT = handleNotFound;
export const DELETE = handleNotFound;
