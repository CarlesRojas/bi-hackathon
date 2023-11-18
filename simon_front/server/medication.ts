import axios from 'axios';
import { z } from 'zod';

const MedicationSchema = z.object({
    id: z.string(),
    patientId: z.string(),
    name: z.string(),
    hour: z.string()
});
export type Medication = z.infer<typeof MedicationSchema>;

export const getMedicationForPatient = async (patientId: string) => {
    const response = await axios.get(`https://bi-hackathon-back.vercel.app/api/medication/${patientId}`);

    return MedicationSchema.parse(response.data) as Medication;
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
