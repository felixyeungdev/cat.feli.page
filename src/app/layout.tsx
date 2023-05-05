import { Metadata } from "next";
import AppBar from "~/components/layout/AppBar";
import Footer from "~/components/layout/Footer";
import "~/styles/global.css";

export const metadata: Metadata = {
    title: "Cats",
    description: "Felix's Cats",
    colorScheme: "light",
    themeColor: "#4f46e5",
    manifest: "/manifest.json",
    icons: { icon: "/assets/icons/cat.png" },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-gray-50">
                <AppBar />
                <main className="min-h-screen">
                    <div>{children}</div>
                </main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
