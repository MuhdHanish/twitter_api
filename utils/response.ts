import { NextResponse } from "next/server";
import { CustomError } from "@/utils/error";

class ResponseHandler  {
  successHandler(data: any = null) {
    const resposeConfig = data ? { message: `OK`, data } : { message: `OK` };
    return NextResponse.json(resposeConfig, { status: 200 });
  }

  createHandler(data: any = null) {
    const resposeConfig = data ? { message: `OK`, data } : { message: `OK` };
    return NextResponse.json(resposeConfig, { status: 201 });
  }

  notFoundHandler(message: any = null) {
    return NextResponse.json(
      { message: message ? message : "Resource Not Found" },
      { status: 404 }
    );
  }

  unAuthenticatedHandler() {
    return NextResponse.json(
      { message: `Un Authenticated` },
      { status: 401 }
    );
  }

  accessForbiddenHandler() {
    return NextResponse.json(
      { message: `Access Forbidden` },
      { status: 403 }
    );
  }

  serverErrorHandler(error: any) {
    console.error("Internal server error:", error);
    const { message = "Unexpected error", code = 500 } = error instanceof CustomError ? error : {};
    return NextResponse.json(
      { message: `Internal server error`, error: message },
      { status: code }
    );
  }

  customHandler(message: string | string[], data: any = null, status: number) {
    const resposeConfig = data ? { message, data } : { message };
    return NextResponse.json(resposeConfig, { status });
  }
}

export const responseHandler = new ResponseHandler();