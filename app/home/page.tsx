// src/app/home/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import Card from "@/app/components/post";

type Post = {
    postId: string;
    title: string;
    tags: string[];
    content: string;
    rank: string;
    status: string;
    postedAt: string;
    posterId: string;
    requiredPlayers: number;
    gameMode: string;
    rankCap: string;
    rankFloor: string;
    eventDateTime: string;
    hasVoiceChat: boolean;
    description: string;
};

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/posts");
            const data = (await response.json()) as Post[];
            setPosts(data);
        };

        fetchData();
    }, []);

    return (
        <div className="main-content">
            <div className="search-container flex">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    placeholder="検索"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <ClearIcon
                        className="clear-icon"
                        onClick={() => setSearchQuery("")}
                    />
                )}
                <Link
                    href="/post"
                    style={{
                        marginBottom: "10px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <button className="create-post-btn">募集する</button>
                </Link>
            </div>

            <div className="filter-container flex">
                <div className="tag">#タグ</div>
                <div className="tag">#タグ</div>
                <div className="tag">#タグ</div>
                <div className="tag">#タグ</div>
                <div className="tag">...</div>
            </div>

            <div className="grid grid-cols-2">
                {posts.map((post) => (
                    <Card key={post.postId} post={post} />
                ))}
            </div>
        </div>
    );
}
