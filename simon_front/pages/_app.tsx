import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { useState } from 'react';

export function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { refetchOnWindowFocus: false, refetchOnReconnect: false, retry: false } }
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <Layout patientId={pageProps.patientId}>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    );
}

export default App;
