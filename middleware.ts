import { createMiddlewareSupabase } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

function redirectWithCookies(
  sessionResponse: NextResponse,
  destination: URL,
): NextResponse {
  const redirect = NextResponse.redirect(destination);
  sessionResponse.cookies.getAll().forEach((cookie) => {
    redirect.cookies.set(cookie.name, cookie.value);
  });
  return redirect;
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createMiddlewareSupabase(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname === "/auth" || pathname.startsWith("/auth/");
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/auth";

  // Avoid a profiles DB round-trip on every navigation (and on Link prefetch).
  // Role is only needed for /admin and for redirecting away from /auth when signed in.
  const needsProfileRole = Boolean(user) && (isAdminRoute || isLoginPage);

  let role: "admin" | "user" | null = null;
  if (needsProfileRole) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user!.id)
      .maybeSingle();
    if (profile?.role === "admin" || profile?.role === "user") {
      role = profile.role;
    }
  }

  if (!user) {
    if (isAuthRoute) {
      return response;
    }
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("next", pathname);
    return redirectWithCookies(response, url);
  }

  if (isAdminRoute) {
    if (role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return redirectWithCookies(response, url);
    }
  }

  if (isLoginPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = role === "admin" ? "/admin" : "/";
    url.search = "";
    return redirectWithCookies(response, url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
