import { GeistSans } from "geist/font/sans";
import { Lexend } from "next/font/google";
import { cn } from "~/lib/utils";
import "~/styles/global.css";

const lexendFont = Lexend({
    variable: "--font-lexend",
    subsets: ["latin-ext"],
    display: "swap",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" className={cn(GeistSans.variable, lexendFont.variable)}>
            <body className="bg-gray-50">
                <div>{children}</div>
            </body>
        </html>
    );
};

export default RootLayout;
