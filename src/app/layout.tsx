import "~/styles/global.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-gray-50">
                <div>{children}</div>
            </body>
        </html>
    );
};

export default RootLayout;
