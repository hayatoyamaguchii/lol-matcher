import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        const postId = Number(params.postId);
        const userId = 1; // 仮のユーザーID（認証実装後に動的に）

        // 応募を登録（冪等性チェックなし）
        await prisma.participant.create({
            data: {
                postId,
                userId,
            },
        });

        return NextResponse.json(
            { message: "応募が完了しました" },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { message: "サーバーエラーが発生しました" },
            { status: 500 }
        );
    }
}
