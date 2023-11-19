import { usePatientMedication } from '@/server/medication';
import { useCreateMedicationHistory, useTodayMedication } from '@/server/medicationHistory';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { RiCircleFill, RiCircleLine, RiLoader4Fill } from 'react-icons/ri';

interface Props {
    patientId: string;
}

interface Inputs {
    medication: string;
}

const MedicationTracker = ({ patientId }: Props) => {
    const patientMedication = usePatientMedication(patientId);
    const todayMedication = useTodayMedication(patientId);
    const createMedication = useCreateMedicationHistory();
    const now = new Date();

    const { register, handleSubmit } = useForm<Inputs>({});

    const onSubmit = async (data: Inputs) => {
        if (!data.medication) return;
        createMedication.mutate({ medicationId: data.medication, patientId });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
            <fieldset className="relative w-full flex flex-wrap p-2 gap-3">
                {patientMedication.data?.map(({ id, hour, name }) => {
                    const medicationTime = new Date(now.toDateString() + ' ' + hour);

                    const medicationTaken =
                        todayMedication.data && todayMedication.data.find(({ medication_id }) => medication_id === id);

                    const hourFormatted = hour.slice(0, -3);

                    return (
                        <label
                            key={id}
                            className="flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-md py-2 px-3"
                            style={{ boxShadow: '0px 0px 4px 2px rgba(38, 123, 102, 0.25)' }}
                        >
                            <input
                                disabled={now < medicationTime}
                                type="radio"
                                className="hidden peer"
                                value={id}
                                {...register('medication')}
                            />

                            <small className="text-xs peer-disabled:opacity-30">1 pastilla de</small>
                            <p className="text-sm font-semibold peer-disabled:opacity-30">{name}</p>
                            <p className="text-xs opacity-50 peer-disabled:opacity-30 pb-2">{hourFormatted}</p>

                            {todayMedication.isLoading && <RiLoader4Fill className="w-6 h-6 animate-spin" />}
                            {!todayMedication.isLoading && !medicationTaken && (
                                <RiCircleLine className="block peer-checked:hidden peer-disabled:opacity-30 w-6 h-6" />
                            )}
                            {!todayMedication.isLoading && !medicationTaken && (
                                <RiCircleFill className="hidden peer-checked:block w-6 h-6 text-[#267B66]" />
                            )}
                            {!todayMedication.isLoading && medicationTaken && (
                                <Image
                                    src={'/icon/tick.png'}
                                    alt={'check'}
                                    width={128}
                                    height={128}
                                    className="w-6 h-6"
                                />
                            )}
                        </label>
                    );
                })}
            </fieldset>

            <button className="bg-[#CAFAEF] rounded-full px-6 py-3">Registrar medicación</button>
        </form>
    );
};

export default MedicationTracker;
