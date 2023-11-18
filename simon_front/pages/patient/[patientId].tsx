import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import { usePatientMedication } from '@/server/medication';
import { useUser } from '@/server/user';
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
    { src: '/image/emoji_4.png', text: 'Animado' }
];
export default function PatientHome() {
    const { query } = useRouter();
    const patientId = query.patientId as string;
    const user = useUser(patientId);
    const patientMedication = usePatientMedication(patientId);

    const container = (children: ReactNode) => <main className="w-full h-full flex flex-col">{children}</main>;

    if (user.isLoading) return container(<Loading />);
    if (user.isError || !user.data) return container(<ErrorMessage />);

    const { data } = user;

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
                        className="w-full h-full"
                        src={'/image/plant_0.png'}
                        alt={'your plant'}
                        width={512}
                        height={512}
                    />
                </div>
            </section>

            <section className="relative p-6 flex flex-col items-center gap-4">
                <div className="flex flex-col w-full-">
                    <h3 className="text-xl font-semibold">{'Organiza tu dia'}</h3>
                    <p>{'Con cada acción que realices, tu planta crecerá contigo'}</p>
                </div>
            </section>
        </>
    );
}
