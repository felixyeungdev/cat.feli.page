import React from "react";
import AppBar from "./AppBar";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <AppBar />
            <main className="min-h-screen">
                <div>{children}</div>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
