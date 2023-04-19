import { FC, PropsWithChildren } from "react";
import PageHead from "~/components/common/PageHead";
import useIsLoading from "~/hooks/useIsLoading";
import AppBar from "./AppBar";
import Footer from "./Footer";
import Loading from "./Loading";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const loading = useIsLoading();

    return (
        <>
            <PageHead />
            <Loading isLoading={loading} />
            <AppBar />
            <main className="min-h-screen">
                <div>{children}</div>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
