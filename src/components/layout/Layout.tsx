import PageHead from "~/components/common/PageHead";
import { AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";
import Footer from "./Footer";
import Loading from "./Loading";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let routeChangeStart = () => {
            setLoading(true);
        };
        let routeChangeComplete = () => {
            setLoading(false);
        };

        router.events.on("routeChangeStart", routeChangeStart);
        router.events.on("routeChangeComplete", routeChangeComplete);
        router.events.on("routeChangeError", routeChangeComplete);
        return () => {
            router.events.off("routeChangeStart", routeChangeStart);
            router.events.off("routeChangeComplete", routeChangeComplete);
            router.events.off("routeChangeError", routeChangeComplete);
        };
    }, [router.events]);

    return (
        <AnimateSharedLayout>
            <PageHead />
            <Loading isLoading={loading} />
            <AppBar />
            <main className="min-h-screen">
                <div>{children}</div>
            </main>
            <Footer />
        </AnimateSharedLayout>
    );
};

export default Layout;
