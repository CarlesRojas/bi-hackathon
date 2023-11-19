import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import BottomComponent from '@/components/patient/BottomComponent';
import Header from '@/components/patient/Header';
import { useUser } from '@/server/user';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return { props: { patientId: context.params?.patientId } };
}

interface Month {
    title: string;
    plants: string[];
}

const months: Month[] = [
    {
        title: 'Noviembre',
        plants: ['/image/plant/nov_1.png', '/image/plant/nov_2.png', '/image/plant/nov_3.png', '/image/plant/nov_4.png']
    },
    {
        title: 'Octubre',
        plants: ['/image/plant/oct_1.png', '/image/plant/oct_2.png', '/image/plant/oct_3.png', '/image/plant/oct_4.png']
    },
    {
        title: 'Septiembre',
        plants: ['/image/plant/sep_1.png', '/image/plant/sep_2.png', '/image/plant/sep_3.png', '/image/plant/sep_4.png']
    }
];

export default function PatientProfile() {
    const { query } = useRouter();
    const patientId = query.patientId as string;
    const user = useUser(patientId);

    const container = (children: ReactNode) => <main className="w-full h-fit flex flex-col gap-8">{children}</main>;

    if (user.isLoading) return container(<Loading />);
    if (user.isError || !user.data) return container(<ErrorMessage />);

    const { data } = user;

    return container(
        <>
            <Header
                icon={
                    <Image
                        src={'/icon/profile.png'}
                        alt="icon"
                        className="w-8 h-8 object-contain"
                        width={128}
                        height={128}
                    />
                }
                title={'Mi perfil'}
                subtitle={'¡Consulta tus datos y logros!'}
            />

            <section className="w-full p-4">
                <div className="w-full flex gap-4 bg-white rounded-2xl shadow-lg p-8">
                    <Image
                        src={'/image/marc.png'}
                        alt="profile image"
                        className="w-16 h-16 object-cover rounded-full"
                        width={512}
                        height={512}
                    ></Image>

                    <div className="w-full flex flex-col">
                        <p className="text-2xl font-semibold">{data.name}</p>
                        <p className="text-base">15/08/96 - 27 años</p>
                    </div>
                </div>
            </section>

            <section className="w-full p-4">
                <p className="px-6 mt-6 text-xl text-[#39B2B2] text-center">¡Tu planta se ve fenomenal!</p>
                <Image
                    src={'/image/main_plant.png'}
                    alt="icon"
                    className="w-full px-16 py-4 object-contain"
                    width={512}
                    height={512}
                />

                <div className="flex flex-col gap-2">
                    <p className="w-full text-sm opacity-50 text-center">
                        ¡Solo te queda un día para cuidar tu planta!
                    </p>

                    <div className="relative w-full grid grid-cols-7 gap-2">
                        {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map((day) => (
                            <div
                                className={`flex w-full aspect-square items-center justify-center rounded-full border bg-opacity-40 border-[#6AD2B9] ${
                                    day === 'Do' ? 'bg-[#6AD2B9]' : 'bg-white'
                                }`}
                                key={day}
                            >
                                <p className="text-sm opacity-50">{day}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <BottomComponent
                title={'Mi jardín'}
                subtitle={'Mientras cultivas tus plantas, cuidas tu mente'}
                content={
                    <section className="w-full flex flex-col gap-2">
                        {months.map(({ plants, title }) => (
                            <div
                                className="w-full bg-white bg-opacity-80 rounded-2xl flex flex-col gap-2 p-4"
                                key={title}
                            >
                                <p className="w-full text-base opacity-90 text-black col-span-full">{title}</p>

                                <div className="w-full grid grid-cols-4">
                                    {plants.map((plant, i) => (
                                        <Image
                                            className={`w-full h-full object-contain ${
                                                title === 'Noviembre' && i === 3 ? 'opacity-30' : ''
                                            }`}
                                            key={`plant_${i}`}
                                            src={plant}
                                            alt={'plant'}
                                            width={512}
                                            height={512}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                }
                background
            />
        </>
    );
}
