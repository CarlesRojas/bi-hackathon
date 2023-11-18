import axios from 'axios';
import { z } from 'zod';

const MedicationHistorySchema = z.object({
    id: z.string(),
    patientId: z.string(),
    name: z.string(),
    hour: z.string()
});
export type MedicationHistory = z.infer<typeof MedicationHistorySchema>;

export const getMedicationHistoryForPatient = async (patientId: string) => {
    const response = await axios.get(`https://bi-hackathon-back.vercel.app/api/medication-history/${patientId}`);

    return MedicationHistorySchema.parse(response.data) as MedicationHistory;
};

interface CreateMedicationHistoryMutation {
    patientId: string;
    medicationId: string;
}

export const createMedication = async ({ patientId, medicationId }: CreateMedicationHistoryMutation) => {
    await axios.post(`https://bi-hackathon-back.vercel.app/api/medication-history/create`, {
        patientId,
        medicationId
    });
};
