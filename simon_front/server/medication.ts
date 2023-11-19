import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

const MedicationSchema = z.object({
    id: z.string(),
    name: z.string(),
    hour: z.string()
});
const MedicationsSchema = z.array(MedicationSchema);
export type Medication = z.infer<typeof MedicationSchema>;

export const getMedicationForPatient = async (patientId: string) => {
    if (!patientId) return undefined;
    const response = await axios.get(`https://bi-hackathon-back.vercel.app/api/medication/${patientId}`);
    return MedicationsSchema.parse(response.data) as Medication[];
};

export const usePatientMedication = (patientId: string) => {
    return useQuery({
        queryKey: ['patientMedication', patientId],
        queryFn: () => getMedicationForPatient(patientId)
    });
};

interface CreateMedicationMutation {
    patientId: string;
    name: string;
    hour: string;
}

export const createMedication = async ({ patientId, name, hour }: CreateMedicationMutation) => {
    await axios.post(`https://bi-hackathon-back.vercel.app/api/medication/create`, {
        patientId,
        name,
        hour
    });
};

interface DeleteMedicationMutation {
    id: string;
}

export const deleteMedication = async ({ id }: DeleteMedicationMutation) => {
    await axios.delete(`https://bi-hackathon-back.vercel.app/api/medication/delete/${id}`);
};
