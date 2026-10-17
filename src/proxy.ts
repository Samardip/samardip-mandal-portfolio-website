import { NextResponse, type NextRequest } from "next/server";
import { caseStudySlugs } from "@/content/slugs";

const known = new Set<string>(caseStudySlugs);

/** Unknown case-study slugs get a real 404 status before the page starts streaming. */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !known.has(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/work/:slug",
};
