import { responseHandler } from "@/utils";

export const GET = () => {
  try {
    return responseHandler.successHandler();
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  }
};