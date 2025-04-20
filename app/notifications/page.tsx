"use client";

import { useAuth } from "@/app/context/authContext";
import { useEffect } from "react";

const NotificationsPage = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        console.log("Notifications Page - isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div>
            <h1>Notifications Page</h1>
            <p>This is the notifications page!</p>
        </div>
    );
};

export default NotificationsPage;
