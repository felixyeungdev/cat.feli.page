import PageHead from "components/common/PageHead";
import { AnimateSharedLayout } from "framer-motion";
import React from "react";
import AppBar from "./AppBar";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => {
    return (
        <AnimateSharedLayout>
            <PageHead />
            <AppBar />
            <main className="min-h-screen">
                <div>{children}</div>
            </main>
            <Footer />
        </AnimateSharedLayout>
    );
};

export default Layout;
