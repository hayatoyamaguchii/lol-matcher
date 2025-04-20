// app/layout.tsx
"use client";

import { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/app/context/authContext";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ja">
            <body>
                <AuthProvider>
                    <div style={{ display: "flex", minHeight: "100vh" }}>
                        <Header />
                        <main className="container mx-auto p-4">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
