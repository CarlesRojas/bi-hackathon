import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import { useUser } from '@/server/user';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Image from "next/image";
import Header from "@/components/patient/Header";
import Card, {Tag, TagBackgroundColor, TagColor} from "@/components/patient/Card";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return { props: { patientId: context.params?.patientId } };
}

export default function PatientCommunity() {
    const { query } = useRouter();
    const patientId = query.patientId as string;
    const user = useUser(patientId);

    const container = (children: ReactNode) => <main className="w-full h-fit flex flex-col">{children}</main>;

    if (user.isLoading) return container(<Loading />);
    if (user.isError || !user.data) return container(<ErrorMessage />);

    const { data } = user;

    return container(
        <>
            <Header icon={
                <Image
                    src={'/icon/community.png'}
                    alt="icon"
                    className="w-8 h-8 object-contain"
                    width={128}
                    height={128}
                />
            }
                    title={'Mi Comunidad'}
                    subtitle={'¡Conoce personas de tu entorno y realiza actividades!'}
            />
            <section className="relative p-6 flex flex-col items-center gap-2">
                <Card
                    image={'/image/event.png'}
                    tag={Tag.EVENT}
                    title={'Caminata Solidaria'}
                    subtitle={'ACFAME - Hoy, 19 de Noviembre - Barceloneta - 19:30h'}
                    content={
                        <div className="relative flex flex-col gap-2 w-full">
                            <p>Andar y moverse llena de vida, y si estos pasos son solidarios, todavía más. </p>
                            <p>En Barcelona nos comprometemos con las grandes causas y el próximo 19 de noviembre saldremos a la calle para hacer kilómetros para recaudar fondos para la Asociación Catalana de Familiares y Enfermos de Esquizofrenia. Lo haremos con una caminata tradicional que este año cambia de formato: más que nunca la participación se centra en la voluntad de ayudar. </p>
                            <a className="text-[#262EEF]" target="_blank" href="https://acfames.org/">Más detalles</a>
                        </div>
                    }
                />
            </section>
            <p className="px-6 mt-6 text-lg text-center text-[#39B2B2]">¡Sal a tomar el aire, tu planta te acompañará!</p>
            <Image
                src={'/image/plant_0.png'}
                alt="icon"
                className="w-full p-8 object-contain"
                width={512}
                height={512}
            />
            <p className="px-6 mt-6 text-xl font-bold text-[#444]">Próximos eventos</p>
            <p className="px-6 mt-1 text-sm text-[#444]">¡Has aprendido todo esto!</p>
            <div className="flex px-6 mt-6">
                <p
                    className="text-left text-xs font-semibold px-2 py-1 rounded-full w-fit mx-1"
                    style={{ color: TagColor[Tag.EVENT], backgroundColor: TagBackgroundColor[Tag.EVENT] }}
                >
                    {Tag.EVENT}
                </p>
                <p
                    className="text-left text-xs font-semibold px-2 py-1 rounded-full w-fit mx-1"
                    style={{ color: '#676BD9', backgroundColor: '#FFF' }}
                >
                    Charla
                </p>
                <p
                    className="text-left text-xs font-semibold px-2 py-1 rounded-full w-fit mx-1"
                    style={{ color: '#376E5A', backgroundColor: '#FFF' }}
                >
                    Grupo de interés
                </p>
            </div>
            <section className="relative p-6 flex flex-col items-center gap-2">
                <Card
                    image={'/image/event1.png'}
                    tag={Tag.TALK}
                    title={'Sesión grupal: ¿Cómo me pueden ayudar las asociación?'}
                    subtitle={'ACFAME - Online - 24/11/23 - 18:00h'}
                    content={
                        <>
                            <p>Los eventos sociales desempeñan un papel fundamental en la terapia mental al proporcionar una plataforma en la que las personas pueden conectarse, compartir experiencias y sentirse parte de una comunidad. La interacción social ofrece diversos beneficios terapéuticos que contribuyen al bienestar mental.</p>
                            <p>La diversidad de experiencias en eventos sociales también puede ofrecer nuevas perspectivas y enfoques para abordar desafíos emocionales. El intercambio de ideas y la exposición a diferentes formas de afrontar situaciones pueden enriquecer el repertorio emocional de una persona y brindarle herramientas adicionales para manejar el estrés y la ansiedad.</p>
                            <div className="text-center p-4">
                                <button className="bg-[#CAFAEF] rounded-full px-6 py-3">Inscribirme</button>
                            </div>
                        </>
                    }
                />
                <Card
                    image={'/image/event2.png'}
                    tag={Tag.INTEREST_GROUP}
                    title={'Club del cine: Comentamos “Cinco lobitos”'}
                    subtitle={'Centro Cultural Can Tauler - Presencial - 25/11/23 - 17:30h'}
                    content={
                        <>
                            <p>Los eventos sociales desempeñan un papel fundamental en la terapia mental al proporcionar una plataforma en la que las personas pueden conectarse, compartir experiencias y sentirse parte de una comunidad. La interacción social ofrece diversos beneficios terapéuticos que contribuyen al bienestar mental.</p>
                            <p>La diversidad de experiencias en eventos sociales también puede ofrecer nuevas perspectivas y enfoques para abordar desafíos emocionales. El intercambio de ideas y la exposición a diferentes formas de afrontar situaciones pueden enriquecer el repertorio emocional de una persona y brindarle herramientas adicionales para manejar el estrés y la ansiedad.</p>
                            <div className="text-center p-4">
                                <button className="bg-[#CAFAEF] rounded-full px-6 py-3">Inscribirme</button>
                            </div>
                        </>
                    }
                />
                <Card
                    image={'/image/event3.png'}
                    tag={Tag.EVENT}
                    title={'¡Nos vamos a visitar Montserrat!'}
                    subtitle={'Asociación Salud Mental Cataluña  - Presencial - 12/12/23 - 9:00h'}
                    content={
                        <>
                            <p>Los eventos sociales desempeñan un papel fundamental en la terapia mental al proporcionar una plataforma en la que las personas pueden conectarse, compartir experiencias y sentirse parte de una comunidad. La interacción social ofrece diversos beneficios terapéuticos que contribuyen al bienestar mental.</p>
                            <p>La diversidad de experiencias en eventos sociales también puede ofrecer nuevas perspectivas y enfoques para abordar desafíos emocionales. El intercambio de ideas y la exposición a diferentes formas de afrontar situaciones pueden enriquecer el repertorio emocional de una persona y brindarle herramientas adicionales para manejar el estrés y la ansiedad.</p>
                            <div className="text-center p-4">
                                <button className="bg-[#CAFAEF] rounded-full px-6 py-3">Inscribirme</button>
                            </div>
                        </>
                    }
                />
                <Card
                    image={'/image/event4.png'}
                    tag={Tag.TALK}
                    title={'No sé como explicar lo que me sucede'}
                    subtitle={'Dra. Elena Castillo - Online - 15/12/23 - 19:30h'}
                    content={
                        <>
                            <p>Los eventos sociales desempeñan un papel fundamental en la terapia mental al proporcionar una plataforma en la que las personas pueden conectarse, compartir experiencias y sentirse parte de una comunidad. La interacción social ofrece diversos beneficios terapéuticos que contribuyen al bienestar mental.</p>
                            <p>La diversidad de experiencias en eventos sociales también puede ofrecer nuevas perspectivas y enfoques para abordar desafíos emocionales. El intercambio de ideas y la exposición a diferentes formas de afrontar situaciones pueden enriquecer el repertorio emocional de una persona y brindarle herramientas adicionales para manejar el estrés y la ansiedad.</p>
                            <div className="text-center p-4">
                                <button className="bg-[#CAFAEF] rounded-full px-6 py-3">Inscribirme</button>
                            </div>
                        </>
                    }
                />
            </section>
            <div className="w-full flex flex-col items-center">
                <p className="px-6 text-sm text-[#444444]">Ver más</p>
            </div>
        </>
    );
}
