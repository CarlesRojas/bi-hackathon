import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import { useUser } from '@/server/user';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return { props: { patientId: context.params?.patientId } };
}

export default function PatientCommunity() {
    const { query } = useRouter();
    const patientId = query.patientId as string;
    const user = useUser(patientId);

    const container = (children: ReactNode) => <main className="w-full h-fit flex flex-col">{children}</main>;

    if (user.isLoading) return container(<Loading />);
    if (user.isError || !user.data) return container(<ErrorMessage />);

    const { data } = user;

    return container(<>Community</>);
}
