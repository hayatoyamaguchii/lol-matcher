// src/app/home/page.tsx
"use client";

import { useState } from "react";
import "@/app/styles/home.css";
import {
    Search as SearchIcon,
    Clear as ClearIcon,
    ExpandMore as ExpandMoreIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");

    // モックデータ
    const posts = [
        {
            id: 1,
            title: "募集名募集名募集名募集名募集名募集名募集名募集名",
            tags: ["#タグ", "#タグ", "#タグ", "#タグ", "#タグ", "#タグ"],
            content:
                "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
            rank: "フレックスランク ランク制限なし",
            status: "募集中",
        },
        {
            id: 2,
            title: "募集名募集名募集名募集名募集名募集名募集名募集名",
            tags: ["#タグ", "#タグ", "#タグ", "#タグ", "#タグ", "#タグ"],
            content:
                "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
            rank: "フレックスランク ランク制限なし",
            status: "締切済み",
        },
        {
            id: 3,
            title: "募集名募集名募集名募集名募集名募集名募集名募集名",
            tags: ["#タグ", "#タグ", "#タグ", "#タグ", "#タグ", "#タグ"],
            content:
                "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
            rank: "フレックスランク ランク制限なし",
            status: "募集中",
        },
    ];

    return (
        <div className="main-content">
            <div className="search-container">
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
                <button className="create-post-btn">募集する</button>
            </div>

            <div className="filter-container">
                <div className="user-avatar">アイコン</div>
                <div className="tag">#タグ</div>
                <div className="tag">#タグ</div>
                <div className="tag">#タグ</div>
                <div className="tag">#タグ</div>
                <div className="tag">...</div>

                <div className="rank-filter">
                    <span className="filter-label">
                        フレックスランク ランク制限なし
                    </span>
                    <button className="apply-filter-btn">応募する</button>
                </div>
            </div>

            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    <div className="post-header">
                        <h2 className="post-title">{post.title}</h2>
                        <MoreVertIcon className="dropdown-icon" />
                    </div>

                    <div className="post-tags">
                        {post.tags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="post-content">{post.content}</p>

                    <div className="post-footer">
                        <div className="post-actions">
                            <button className="action-btn profile-btn">
                                op.gg
                            </button>
                            {post.status === "募集中" ? (
                                <button className="action-btn profile-btn">
                                    プロフィール
                                </button>
                            ) : null}
                        </div>

                        <div className="rank-info">{post.rank}</div>

                        <button
                            className="action-btn apply-btn"
                            disabled={post.status !== "募集中"}
                        >
                            {post.status === "募集中" ? "応募する" : "締切済み"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
