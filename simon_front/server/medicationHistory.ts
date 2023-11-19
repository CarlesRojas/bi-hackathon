import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

const MedicationHistorySchema = z.object({
    id: z.string(),
    medication_id: z.string(),
    created_at: z.string().pipe(z.coerce.date()).or(z.date())
});
const MedicationHistoryArraySchema = z.array(MedicationHistorySchema);
export type MedicationHistory = z.infer<typeof MedicationHistorySchema>;

export const getMedicationHistoryForPatient = async (medicationIds?: string[]) => {
    if (!medicationIds) return undefined;
    const response = await Promise.all(
        medicationIds.map((medicationId) =>
            axios.get(`https://bi-hackathon-back.vercel.app/api/medication-history/${medicationId}`)
        )
    );
    return response.map(({ data }) => MedicationHistoryArraySchema.parse(data) as MedicationHistory[]);
};

export const usePatientMedicationHistory = (medicationIds?: string[]) => {
    const keys = medicationIds ? ['patientMedicationHistory', ...medicationIds] : ['patientMedicationHistory'];
    const query = useQuery({
        queryKey: keys,
        queryFn: () => getMedicationHistoryForPatient(medicationIds)
    });

    const today = new Date();

    const todayMedicationHistory = query.data?.map((medicationHistory) =>
        medicationHistory.filter((history) => history.created_at.getDate() === today.getDate())
    );

    return { ...query, todayMedicationHistory };
};

interface CreateMedicationHistoryMutation {
    medicationId: string;
}

export const createMedicationHistory = async ({ medicationId }: CreateMedicationHistoryMutation) => {
    await axios.get(`https://bi-hackathon-back.vercel.app/api/medication-history/create/${medicationId}`);
};

export const useCreateMedicationHistory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createMedicationHistory,

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['patientMedicationHistory'] });
        }
    });
};
