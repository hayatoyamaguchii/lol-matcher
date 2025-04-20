"use client";

import { useAuth } from "@/app/context/authContext";
import { useEffect } from "react";

const MyPage = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        console.log("My Page - isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div>
            <h1>My Page</h1>
            <p>This is your personal page!</p>
        </div>
    );
};

export default MyPage;
