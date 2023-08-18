import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const pathname = req.nextUrl.pathname;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && pathname === "/") {
    const url = new URL(req.url);
    console.log(url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
