import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="relative p-4 w-screen h-screen bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-50">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
