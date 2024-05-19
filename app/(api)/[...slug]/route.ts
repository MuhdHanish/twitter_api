import { responseHandler } from "@/utils";

export const handleNotFound = () => {
  try {
    return responseHandler.notFoundHandler();
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  }
};

export const GET = () => handleNotFound();
export const POST = () => handleNotFound();
export const PUT = () => handleNotFound();
export const DELETE = () => handleNotFound();
