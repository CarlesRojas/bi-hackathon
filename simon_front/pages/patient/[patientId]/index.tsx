import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import BottomComponent from '@/components/patient/BottomComponent';
import Card, { Tag } from '@/components/patient/Card';
import MedicationTracker from '@/components/patient/MedicationTracker';
import { usePatientMedication } from '@/server/medication';
import { usePatientMedicationHistory } from '@/server/medicationHistory';
import { useUser } from '@/server/user';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface Mood {
    src: string;
    text: string;
}

const MOODS: Mood[] = [
    { src: '/image/emoji_0.png', text: 'Feliz' },
    { src: '/image/emoji_1.png', text: 'Cansado' },
    { src: '/image/emoji_2.png', text: 'Asustado' },
    { src: '/image/emoji_3.png', text: 'Animado' },
    { src: '/image/emoji_4.png', text: 'Triste' }
];

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return { props: { patientId: context.params?.patientId } };
}

const plantStages = ['/image/main_plant_0.png', '/image/main_plant_1.png', '/image/main_plant.png'];

export default function PatientHome() {
    const { query, push } = useRouter();
    const patientId = query.patientId as string;
    const user = useUser(patientId);
    const patientMedication = usePatientMedication(patientId);
    const patientMedicationHistory = usePatientMedicationHistory(patientMedication?.data?.map(({ id }) => id));

    const container = (children: ReactNode) => <main className="w-full h-fit flex flex-col">{children}</main>;

    if (user.isLoading) return container(<Loading />);
    if (user.isError || !user.data) return container(<ErrorMessage />);

    const { data } = user;

    const date = new Date();
    const formattedDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });

    const medicationTaken =
        patientMedicationHistory.todayMedicationHistory?.filter((history) => history.length > 0).length ?? 0;

    const currentPlant =
        medicationTaken >= 0 && medicationTaken < plantStages.length
            ? plantStages[medicationTaken]
            : plantStages[plantStages.length - 1];

    return container(
        <>
            <section className="relative flex flex-col items-center">
                <div className="absolute w-full h-full pb-16 pointer-events-none select-none">
                    <div className="relative w-full h-full">
                        <Image
                            className="w-full h-full rounded-b-[2rem] opacity-20"
                            src={'/image/bg.png'}
                            alt={'background'}
                            fill
                            priority
                        />
                    </div>
                </div>

                <div className="relative w-full p-6 flex flex-col gap-4 items-center">
                    <h3 className="text-3xl font-medium text-lime-950 mt-20">Hola {data.name}</h3>
                    <p className="text-xl text-gray-800">{'¿Cómo te encuentras hoy?'}</p>

                    <fieldset className="gap-2 w-full grid grid-cols-5">
                        {MOODS.map(({ src, text }) => (
                            <label key={text}>
                                <input type="radio" name="animo" className="hidden peer" />
                                <div className="flex flex-col bg-white bg-opacity-90 rounded-lg pb-3 border-[3px] border-transparent peer-checked:border-lime-600">
                                    <div className="w-full p-3 pb-1">
                                        <Image
                                            className="w-full h-full rounded-b-3xl"
                                            src={src}
                                            alt={`icono ${src}`}
                                            width={512}
                                            height={512}
                                        />
                                    </div>

                                    <span className="w-full text-center text-xs text-gray-800">{text}</span>
                                </div>
                            </label>
                        ))}
                    </fieldset>
                </div>
            </section>

            <section className="relative p-6 flex flex-col items-center gap-4">
                <h3 className="text-xl text-[#39B2B2] text-center font-semibold">
                    {'¡Hoy es un buen dia para cultivar tu mente!'}
                </h3>

                <div className="w-full pointer-events-none select-none">
                    <Image
                        src={currentPlant}
                        alt="icon"
                        className="w-full px-10 object-contain"
                        width={512}
                        height={512}
                        priority
                    />
                </div>
            </section>

            <section className="relative p-6 flex flex-col items-center gap-2">
                <div className="flex flex-col w-full">
                    <h3 className="text-xl font-semibold">{'Organiza tu dia'}</h3>
                    <p>{'Con cada acción que realices, tu planta crecerá contigo'}</p>
                </div>

                <Card
                    image={'/image/medicacion.png'}
                    tag={Tag.MED}
                    title={'Toma de medicación'}
                    subtitle={`${medicationTaken}/${patientMedication.data?.length ?? 0}      ¡Vamos a cuidarnos!`}
                    description={'Tienes pendiente registrar tu toma'}
                    content={<MedicationTracker patientId={patientId} />}
                />

                <Card
                    image={'/image/doctor.png'}
                    tag={Tag.CITA}
                    title={'Tiene una cita médica'}
                    subtitle={`Hoy, ${formattedDate} a las 12:30`}
                    description={"Dra. Anna Ruíz - Hospital Vall d'Hebron Barcelona"}
                    onClick={() => push(`/patient/${patientId}/profile`)}
                />

                <Card
                    image={'/image/formation1.png'}
                    tag={Tag.ARTICLE}
                    title={'La primera visita al psicólogo: Preguntas frecuentes'}
                    subtitle={'Alberto Soler - 5 min'}
                    onClick={() => push(`/patient/${patientId}/learn`)}
                />

                <Card
                    image={'/image/event.png'}
                    tag={Tag.EVENT}
                    title={'Caminata Solidaria'}
                    subtitle={`Hoy, ${formattedDate} a las 16:00`}
                    description={'ACFAME - Barceloneta'}
                    onClick={() => push(`/patient/${patientId}/community`)}
                />
            </section>

            <BottomComponent title={'Todo lo que estás mejorando'} subtitle="¿Has visto todo lo que has logrado?" />
        </>
    );
}
