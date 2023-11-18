import { useRouter } from 'next/router';

export default function PatientHome() {
    const { query } = useRouter();
    const patientId = query.patientId as string;

    return <main className="w-full h-full flex flex-col gap-4">{patientId}</main>;
}
