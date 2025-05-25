// app/hooks/useNotifications.ts
import axios from "axios";

export async function getNotifications() {
    const res = await axios.get("/api/notifications");
    return res.data;
}

export async function respondToApplication(
    participantId: number,
    status: "ACCEPTED" | "REJECTED"
) {
    await axios.post("/api/notifications/respond", {
        participantId,
        status,
    });
}
