"use client";

import { useAuth } from "@/app/context/authContext";
import { useEffect } from "react";

const SearchPage = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        console.log("Search Page - isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div>
            <h1>Search Page</h1>
            <p>This is the search page!</p>
        </div>
    );
};

export default SearchPage;
