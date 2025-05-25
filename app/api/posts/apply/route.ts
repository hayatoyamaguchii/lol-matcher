import { NextResponse } from "next/server";

// 応募ボタン押下 (POST /posts/apply)
export async function POST(request: Request) {
    // TODO: 応募処理を実装
    return NextResponse.json({ success: true });
}
