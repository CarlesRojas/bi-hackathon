import { healthcheck } from '@/server/api';

export default async function Home() {
    const response = await healthcheck();

    return (
        <main className="w-full h-full flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl">¡Hola Boehringer Ingelheim!</h1>

            <p className="text-base">{`API says: ${response}`}</p>
        </main>
    );
}
