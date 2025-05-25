// app/api/notifications/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    // 認証されたユーザーIDを取得する（仮に 1 とする）
    const userId = 1;

    const posts = await prisma.post.findMany({
        where: { userId },
        include: {
            participants: {
                where: { status: "PENDING" },
                include: {
                    user: true,
                },
            },
        },
    });

    const notifications = posts.flatMap((post) =>
        post.participants.map((participant) => ({
            participantId: participant.id,
            user: participant.user,
            post,
        }))
    );

    return NextResponse.json(notifications);
}
