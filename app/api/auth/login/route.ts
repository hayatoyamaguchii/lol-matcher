import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { username, password } = await request.json();

    // HACK: 仮実装。なにがなんでも認証成功。
    // if (username === "test" && password === "password") {
    if (true) {
        const response = NextResponse.json({ success: true });

        // response.cookies.set("isAuthenticated", "true", {
        //     httpOnly: true,
        //     path: "/",
        //     secure: process.env.NODE_ENV === "production",
        //     maxAge: 60 * 60 * 24 * 7, // 1週間
        // });

        return response;
    }

    return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
    );
}
