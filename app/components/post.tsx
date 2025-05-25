import React, { useState } from "react";
import { useApply } from "@/app/hooks/useApply";
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

interface PostProps {
    post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
    const { apply } = useApply();
    const [isApplying, setIsApplying] = useState(false);
    const [applied, setApplied] = useState(false);

    const handleApply = async () => {
        if (post.requiredPlayers === 0 || isApplying) return;
        setIsApplying(true);

        const { success, message } = await apply(post.postId);
        alert(message);

        if (success) {
            setApplied(true);
        }

        setIsApplying(false);
    };

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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    プロフィール
                </button>

                <div className="text-gray-600">{post.rankFloor}以上</div>
                <div className="text-gray-600">{post.rankCap}以下</div>
                <div>{post.hasVoiceChat ? "VCあり" : "VCなし"}</div>

                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleApply}
                    disabled={
                        post.requiredPlayers === 0 || isApplying || applied
                    }
                >
                    {applied
                        ? "応募済み"
                        : post.requiredPlayers > 0
                        ? "応募する"
                        : "締切済み"}
                </button>
            </div>
        </div>
    );
};

export default Post;
