import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document<{}> {
    render() {
        return (
            <Html>
                <Head />
                <body className="bg-gray-50 font-display">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;