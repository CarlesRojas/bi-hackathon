import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import Header from '@/components/patient/Header';
import { useUser } from '@/server/user';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { RiCircleFill, RiCircleLine } from 'react-icons/ri';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return { props: { patientId: context.params?.patientId } };
}

const symptoms: { icon: string; title: string }[] = [
    { icon: '/icon/symptom_0.png', title: 'Mareos' },
    { icon: '/icon/symptom_1.png', title: 'Somnolencia excesiva' },
    { icon: '/icon/symptom_2.png', title: 'Problemas de memoria' },
    { icon: '/icon/symptom_3.png', title: 'Ganancia de peso' }
];

interface Inputs {
    symptoms: string;
}

export default function PatientMedication() {
    const { query } = useRouter();
    const patientId = query.patientId as string;
    const user = useUser(patientId);

    const { register, handleSubmit } = useForm<Inputs>({});

    const container = (children: ReactNode) => <main className="w-full h-fit flex flex-col gap-8">{children}</main>;

    if (user.isLoading) return container(<Loading />);
    if (user.isError || !user.data) return container(<ErrorMessage />);

    const { data } = user;

    const onSubmit = (data: Inputs) => {
        console.log(data);
    };

    return container(
        <>
            <Header
                icon={
                    <Image
                        src={'/icon/meds.png'}
                        alt="icon"
                        className="w-8 h-8 object-contain"
                        width={128}
                        height={128}
                    />
                }
                title={'Mi medicación'}
                subtitle={'¡Hoy es un buen dia para cultivar tu mente!'}
            />
            <div>
                <p className="w-full text-center px-6 text-lg text-[#39B2B2]">¡Tu planta se ve fenomenal!</p>

                <Image
                    src={'/image/plant_0.png'}
                    alt="icon"
                    className="w-full px-16 py-4 object-contain"
                    width={512}
                    height={512}
                />
            </div>

            <div>
                <p className="w-full text-center px-6 text-lg opacity-60">Calendario de tu medicación</p>

                <Image
                    src={'/image/calendar.png'}
                    alt="icon"
                    className="w-full px-4 pb-4 object-contain"
                    width={1412 / 2}
                    height={1120 / 2}
                />
            </div>

            <section className="w-full bg-[#39B2B2] px-4 py-8 flex flex-col gap-4">
                <p className="w-full text-center px-6 text-lg opacity-90 text-white">Todo lo que estás mejorando</p>

                <div className="w-full shadow-[0px_0px_10.6px_0px_#C5FAED] rounded-[1.6rem] flex gap-2 bg-white py-3 px-6 items-center">
                    <Image src={'/image/plant.png'} alt="icon" className="w-8 h-8" width={512} height={512} />
                    <p className="text-4xl text-[#249F9F]">14</p>
                    <p className="text-sm text-[#249F9F]">días consecutivos tomando tu medicación</p>
                </div>
            </section>

            <div>
                <p className="w-full text-center px-6 text-lg opacity-60">¿Has tenido alguno de estos síntomas?</p>

                <p className="w-full text-center px-6 text-sm opacity-40">Hoy</p>
                <p className="w-full text-center px-6 text-xs opacity-40">
                    {new Date().toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
                    <fieldset className="relative w-full grid grid-cols-2 px-16 py-4 gap-3">
                        {symptoms.map(({ icon, title }) => (
                            <label
                                key={title}
                                className="flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-md p-2 gap-2"
                                style={{ boxShadow: '0px 0px 4px 2px rgba(38, 123, 102, 0.25)' }}
                            >
                                <input type="radio" className="hidden peer" value={title} {...register('symptoms')} />

                                <Image src={icon} className="w-16 h-16" alt="symptom icon" width={256} height={256} />
                                <p className="text-sm font-semibold peer-disabled:opacity-30 text-center">{title}</p>

                                <RiCircleLine className="block peer-checked:hidden peer-disabled:opacity-30 w-6 h-6" />
                                <RiCircleFill className="hidden peer-checked:block w-6 h-6 text-[#267B66]" />
                            </label>
                        ))}
                    </fieldset>

                    <button className="bg-[#CAFAEF] rounded-full px-6 py-3">Registrar síntoma</button>
                </form>
            </div>
        </>
    );
}
