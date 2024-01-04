import { Metadata } from "next";
import AppBar from "~/components/layout/AppBar";
import Footer from "~/components/layout/Footer";
import "~/styles/global.css";

export const metadata: Metadata = {
    title: {
        default: "Cats",
        template: "%s | Cats",
    },
    description: "Felix's Cats",
    manifest: "/manifest.json",
    icons: { icon: "/assets/icons/cat.png" },
};

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
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

export default SiteLayout;
