import MedicationForm from '@/components/doctor/MedicationForm';
import { useRouter } from 'next/router';

export default function PatientForDoctor() {
    const { query } = useRouter();
    const doctorId = query.doctorId as string;
    const patientId = query.patientId as string;

    return (
        <main className="w-full h-full flex flex-col gap-4">
            <MedicationForm patientId={patientId} />
        </main>
    );
}
