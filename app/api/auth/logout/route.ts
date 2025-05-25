// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true });

    // 認証Cookieを削除（レスポンス経由で）
    // response.cookies.set("isAuthenticated", "", {
    //     maxAge: 0,
    //     path: "/",
    // });

    return response;
}
