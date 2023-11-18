import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import { useUsers } from '@/server/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function Doctor() {
    const { query } = useRouter();
    const doctorId = query.doctorId as string;
    const users = useUsers();

    const container = (children: ReactNode) => <main className="w-full h-full flex flex-col gap-4">{children}</main>;

    if (users.isLoading) return container(<Loading />);
    if (users.isError || !users.data) return container(<ErrorMessage />);

    const { patients } = users;

    return container(
        <section className="flex w-full flex-col">
            <h3 className="text-lg font-medium text-lime-500 mb-2">Tus pacientes</h3>
            {patients.map(({ id, name }) => (
                <Link
                    href={`/doctor/${doctorId}/patient/${id}`}
                    key={id}
                    className="w-fit flex flex-col gap-4 py-2 px-4 rounded-md bg-gray-200 dark:bg-gray-800"
                >
                    <p>{name}</p>
                </Link>
            ))}
        </section>
    );
}
