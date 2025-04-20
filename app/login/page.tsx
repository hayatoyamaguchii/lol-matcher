// src/app/login/page.tsx
"use client";

import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("Login Page - isAuthenticated:", isAuthenticated);
        if (isAuthenticated) {
            router.push("/home");
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async () => {
        login();
        router.push("/home");
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center">ログイン</h1>
                <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={handleSubmit}
                >
                    ログイン
                </button>
            </div>
        </div>
    );
}
