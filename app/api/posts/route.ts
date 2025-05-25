import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Post = {
    postId: string;
    postedAt: string;
    posterId: string;
    requiredPlayers: number;
    gameMode: string;
    rankCap: string;
    rankFloor: string;
    tags: string[];
    eventDateTime: string;
    hasVoiceChat: boolean;
    description: string;
};

// 投稿一覧取得 (GET /posts)
export async function GET(request: Request) {
    try {
        const posts = await prisma.post.findMany({
            include: {
                tags: {
                    include: {
                        tag: true, // PostTag → Tag.name を取得
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const formatted = posts.map((post) => ({
            postId: String(post.id),
            postedAt: post.createdAt.toISOString(),
            posterId: String(post.userId),
            requiredPlayers: post.requiredPlayers,
            gameMode: post.gameMode,
            rankCap: post.rankCap || "制限なし",
            rankFloor: post.rankFloor || "制限なし",
            tags: post.tags.map((pt) => `#${pt.tag.name}`),
            eventDateTime: post.eventDateTime?.toISOString(),
            hasVoiceChat: post.hasVoiceChat,
            description: post.description,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}

// 新規投稿作成 (POST /posts)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            gameMode,
            requiredPlayers,
            tags,
            hasVoiceChat,
            discordUrl,
            description,
            eventDateTime,
            rankCap,
            rankFloor,
        } = body;

        // 仮の userId（今後ヘッダーから取得に切り替え予定）
        const userId = 1;

        const createdPost = await prisma.$transaction(async (tx) => {
            // 1. 投稿を作成
            const post = await tx.post.create({
                data: {
                    userId,
                    gameMode,
                    requiredPlayers,
                    rankFloor,
                    rankCap,
                    eventDateTime: eventDateTime
                        ? new Date(eventDateTime)
                        : undefined,
                    hasVoiceChat,
                    discordUrl,
                    description,
                },
            });

            // 2. タグがある場合は処理
            if (tags && Array.isArray(tags) && tags.length > 0) {
                // 既存タグを検索、存在しないタグを作成
                const tagRecords = await Promise.all(
                    tags.map(async (tagName: string) => {
                        const existing = await tx.tag.findUnique({
                            where: { name: tagName },
                        });
                        if (existing) return existing;
                        return await tx.tag.create({ data: { name: tagName } });
                    })
                );

                // 3. PostTag に紐付け
                await Promise.all(
                    tagRecords.map((tag) =>
                        tx.postTag.create({
                            data: {
                                postId: post.id,
                                tagId: tag.id,
                            },
                        })
                    )
                );
            }

            return post;
        });

        return NextResponse.json({ id: createdPost.id }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}
