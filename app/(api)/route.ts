import { responseHandler } from "@/utils";

export const handleNotFound = () => {
  try {
    return responseHandler.notFoundHandler();
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  }
}
export const GET = () => {
  try {
    return responseHandler.successHandler();
  } catch (error) {
    return responseHandler.serverErrorHandler(error);
  }
};