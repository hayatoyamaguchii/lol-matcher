// hooks/useApply.ts
export const useApply = () => {
    const apply = async (
        postId: string
    ): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await fetch(`/api/posts/${postId}/apply`, {
                method: "POST",
            });

            const data = await response.json();

            return {
                success: response.ok,
                message: data.message || "何らかのエラーが発生しました",
            };
        } catch (error) {
            console.error("応募エラー:", error);
            return {
                success: false,
                message: "ネットワークエラーが発生しました",
            };
        }
    };

    return { apply };
};
