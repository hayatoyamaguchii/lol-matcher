// src/components/footer.tsx
import { useAuth } from "@/app/context/authContext";
import Link from "next/link";
import {
    Info as InfoIcon,
    Help as HelpIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";

export const Footer = () => {
    return (
        <footer
            style={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "20px",
                borderLeft: "1px solid #ccc",
            }}
        >
            <div style={{ marginBottom: "20px", width: "100%" }}>
                <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>
                    最近のアクティビティ
                </h3>
                <div style={{ fontSize: "14px", color: "#666" }}>
                    まだアクティビティはありません
                </div>
            </div>

            <div style={{ marginBottom: "20px", width: "100%" }}>
                <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>
                    おすすめのプレイヤー
                </h3>
                <div style={{ fontSize: "14px", color: "#666" }}>
                    おすすめのプレイヤーはいません
                </div>
            </div>

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    marginTop: "auto",
                }}
            >
                <Link
                    href="/about"
                    style={{
                        marginBottom: "10px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        color: "#666",
                    }}
                >
                    <InfoIcon style={{ width: "16px", marginRight: "5px" }} />
                    About
                </Link>
                <Link
                    href="/help"
                    style={{
                        marginBottom: "10px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        color: "#666",
                    }}
                >
                    <HelpIcon style={{ width: "16px", marginRight: "5px" }} />
                    Help
                </Link>
                <Link
                    href="/settings"
                    style={{
                        marginBottom: "10px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        color: "#666",
                    }}
                >
                    <SettingsIcon
                        style={{ width: "16px", marginRight: "5px" }}
                    />
                    Settings
                </Link>
                <div
                    style={{
                        fontSize: "12px",
                        color: "#999",
                        marginTop: "20px",
                    }}
                >
                    © {new Date().getFullYear()} LoL Matcher
                </div>
            </nav>
        </footer>
    );
};
