import { useState } from "react";
import { Post } from "@/app/post/page";

const useCreatePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createPost = async (postData: Post) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (e: unknown) {
            setError(e as Error);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { createPost, isLoading, error };
};

export default useCreatePost;
