import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import uuid from 'react-uuid';
import { z } from 'zod';

const MedicationHistorySchema = z.object({
    id: z.string(),
    medication_id: z.string(),
    created_at: z.string().pipe(z.coerce.date()).or(z.date())
});
const MedicationHistoryArraySchema = z.array(MedicationHistorySchema);
export type MedicationHistory = z.infer<typeof MedicationHistorySchema>;

export const getMedicationHistoryForPatient = async (medicationIds?: string[]) => {
    if (!medicationIds) return null;
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
    patientId: string;
}

export const createMedicationHistory = async ({ medicationId, patientId }: CreateMedicationHistoryMutation) => {
    await axios.get(`https://bi-hackathon-back.vercel.app/api/medication-history/create/${medicationId}`);
};

export const useCreateMedicationHistory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createMedicationHistory,
        onMutate: async ({ medicationId, patientId }) => {
            await queryClient.cancelQueries({ queryKey: ['todayMedication', patientId] });
            const previous: MedicationHistory[] | undefined = queryClient.getQueryData(['todayMedication', patientId]);
            if (!previous) return { previous };

            const newData = [...previous];
            newData.push({ id: uuid(), medication_id: medicationId, created_at: new Date() });

            queryClient.setQueryData(['todayMedication', patientId], newData);
            return { previous };
        },
        onError: (err, newTodo, context) => {
            if (context) queryClient.setQueryData(['todayMedication'], context.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todayMedication'] });
        }
    });
};

export const getTodayMedication = async (patientId?: string) => {
    if (!patientId) return undefined;
    const response = await axios.get(
        `https://bi-hackathon-back.vercel.app/api/medication-history/patient/${patientId}`
    );
    return MedicationHistoryArraySchema.parse(response.data) as MedicationHistory[];
};

export const useTodayMedication = (patientId?: string) => {
    return useQuery({
        queryKey: ['todayMedication', patientId],
        queryFn: () => getTodayMedication(patientId)
    });
};
