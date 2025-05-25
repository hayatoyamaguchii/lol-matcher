import { NextResponse } from "next/server";

// 特定の投稿を取得 (GET /posts/{postId})
export async function GET(
    request: Request,
    { params }: { params: { postId: string } }
) {
    // TODO: 特定の投稿を取得する処理を実装
    const postId = params.postId;
    return NextResponse.json({ id: postId });
}

// 投稿を編集 (PUT /posts/{postId})
export async function PUT(
    request: Request,
    { params }: { params: { postId: string } }
) {
    // TODO: 投稿を編集する処理を実装
    const postId = params.postId;
    return NextResponse.json({ id: postId });
}

// 投稿を削除 (DELETE /posts/{postId})
export async function DELETE(
    request: Request,
    { params }: { params: { postId: string } }
) {
    // TODO: 投稿を削除する処理を実装
    const postId = params.postId;
    return NextResponse.json({ success: true });
}
