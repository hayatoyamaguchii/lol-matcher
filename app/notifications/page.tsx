"use client";
import { useEffect, useState } from "react";
import {
    getNotifications,
    respondToApplication,
} from "@/app/hooks/useNotifications";
import { Button } from "@mui/material";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getNotifications();
            setNotifications(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleResponse = async (
        participantId: number,
        status: "ACCEPTED" | "REJECTED"
    ) => {
        await respondToApplication(participantId, status);
        setNotifications((prev) =>
            prev.filter((n) => n.participantId !== participantId)
        );
    };

    if (loading) return <div>読み込み中...</div>;
    if (notifications.length === 0) return <div>通知はありません</div>;

    return (
        <div className="p-4 space-y-4">
            {notifications.map((n) => (
                <div
                    key={n.participantId}
                    className="p-4 border rounded-xl shadow-sm"
                >
                    <div className="font-semibold">
                        {n.user.riotGameName ?? "無名のユーザー"}{" "}
                        さんが応募しました。
                    </div>
                    <div className="text-sm text-gray-500">
                        {n.post.description}
                    </div>
                    <div className="mt-2 space-x-2">
                        <Button
                            onClick={() =>
                                handleResponse(n.participantId, "ACCEPTED")
                            }
                        >
                            承諾
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() =>
                                handleResponse(n.participantId, "REJECTED")
                            }
                        >
                            拒否
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
