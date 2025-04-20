"use client";

import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("Landing Page - isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">LoL Matcher</h1>
            <p className="text-gray-600 mb-8">
                Find your perfect League of Legends duo partner!
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => router.push("/login")}
            >
                Get Started
            </button>
        </div>
    );
}
