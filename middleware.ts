import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  try {
      const token = request.cookies.get("tokenUser");
      const payload = jwt.verify(
        token?.value ?? '',
        process.env.SECRET_JWT!
        );
          return NextResponse.next();
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/gate", request.url));
    }
}

export const config={
  matcher: ['/profile']
}