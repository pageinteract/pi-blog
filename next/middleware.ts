import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// No i18n middleware - all requests pass through without locale redirection
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
