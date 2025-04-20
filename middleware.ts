import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const isAuthenticated =
        request.cookies.get("isAuthenticated")?.value === "true";

    // 未ログイン、/login以外にアクセスしたら/loginへ
    if (!isAuthenticated && request.nextUrl.pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // ログイン済み、/login, /にアクセスしたら/homeへ
    if (
        isAuthenticated &&
        (request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/")
    ) {
        return NextResponse.redirect(new URL("/home", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/home(.*)", "/notifications(.*)", "/mypage(.*)", "/search(.*)"],
};
