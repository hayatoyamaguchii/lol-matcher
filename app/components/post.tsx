import React from "react";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

interface Post {
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
}

interface CardProps {
    post: Post;
}

const Card: React.FC<CardProps> = ({ post }) => {
    return (
        <div key={post.postId} className="bg-white rounded-lg p-4 m-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">
                    {post.gameMode}
                    {post.eventDateTime === null
                        ? "今すぐ"
                        : post.eventDateTime + "から"}
                </h2>
                <p>投稿日時: {post.postedAt}</p>
                <MoreVertIcon className="text-gray-500 cursor-pointer" />
            </div>

            <div className="flex flex-wrap mb-2">
                {post.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm font-bold mr-2"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <p className="text-gray-700">{post.description}</p>

            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                    {/* TODO: リンク系整える */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        プロフィール
                    </button>
                </div>

                <div className="text-gray-600">{post.rankFloor}以上</div>
                <div className="text-gray-600">{post.rankCap}以下</div>
                <div>{post.hasVoiceChat}</div>

                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    disabled={post.requiredPlayers === 0}
                >
                    {post.requiredPlayers > 0 ? "応募する" : "締切済み"}
                </button>
            </div>
        </div>
    );
};

export default Card;
