import Link from "next/link";
import {
    Home as HomeIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
    AccountCircle as AccountCircleIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";
import { useAuth } from "@/app/context/authContext";

export const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
        <header
            style={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "20px",
                borderRight: "1px solid #ccc",
            }}
        >
            <img
                src="/logo.png"
                alt="Logo"
                style={{ width: "100%", marginBottom: "20px" }}
            />
            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <Link
                    href="/home"
                    style={{
                        marginBottom: "10px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <HomeIcon style={{ width: "20px", marginRight: "5px" }} />
                    Home
                </Link>
                <Link
                    href="/notifications"
                    style={{
                        marginBottom: "10px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <NotificationsIcon
                        style={{ width: "20px", marginRight: "5px" }}
                    />
                    Notifications
                </Link>
                {isAuthenticated && (
                    <Link
                        href="/search"
                        style={{
                            marginBottom: "10px",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <SearchIcon
                            style={{ width: "20px", marginRight: "5px" }}
                        />
                        User Search
                    </Link>
                )}
                <Link
                    href="/mypage"
                    style={{
                        marginBottom: "10px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <AccountCircleIcon
                        style={{ width: "20px", marginRight: "5px" }}
                    />
                    My Page
                </Link>
                <Link
                    href="/logout"
                    style={{
                        marginBottom: "10px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <LogoutIcon style={{ width: "20px", marginRight: "5px" }} />
                    Logout
                </Link>
            </nav>
        </header>
    );
};
