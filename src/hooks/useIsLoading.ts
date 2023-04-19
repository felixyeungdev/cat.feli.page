import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useIsLoading = () => {
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

    return loading;
};

export default useIsLoading;
