import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en" className="bg-white">
            <Head />
            <body className="relative w-screen h-screen bg-gradient-to-b from-[#A6F9E5] to-white bg-white">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
