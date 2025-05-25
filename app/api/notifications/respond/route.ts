// app/api/notifications/respond/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { participantId, status } = await req.json();

    if (!participantId || !["ACCEPTED", "REJECTED"].includes(status)) {
        return NextResponse.json(
            { message: "不正なリクエストです" },
            { status: 400 }
        );
    }

    await prisma.participant.update({
        where: { id: participantId },
        data: { status },
    });

    return NextResponse.json({ message: "ステータスを更新しました" });
}
