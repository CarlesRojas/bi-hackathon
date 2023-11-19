import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import BottomComponent from '@/components/patient/BottomComponent';
import Card, { Tag, TagBackgroundColor, TagColor } from '@/components/patient/Card';
import Header from '@/components/patient/Header';
import SlimCard from '@/components/patient/SlimCard';
import { default as SquareCard } from '@/components/patient/SquareCard';
import { useUser } from '@/server/user';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

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
            <Header
                icon={
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
                            <p>
                                En Barcelona nos comprometemos con las grandes causas y el próximo 19 de noviembre
                                saldremos a la calle para hacer kilómetros para recaudar fondos para la Asociación
                                Catalana de Familiares y Enfermos de Esquizofrenia. Lo haremos con una caminata
                                tradicional que este año cambia de formato: más que nunca la participación se centra en
                                la voluntad de ayudar.{' '}
                            </p>
                            <a className="text-[#262EEF]" target="_blank" href="https://acfames.org/">
                                Más detalles
                            </a>
                        </div>
                    }
                />
            </section>
            <p className="px-6 mt-6 text-lg text-center text-[#39B2B2]">
                ¡Sal a tomar el aire, tu planta te acompañará!
            </p>
            <Image
                src={'/image/main_plant.png'}
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
                            <p>
                                Los eventos sociales desempeñan un papel fundamental en la terapia mental al
                                proporcionar una plataforma en la que las personas pueden conectarse, compartir
                                experiencias y sentirse parte de una comunidad. La interacción social ofrece diversos
                                beneficios terapéuticos que contribuyen al bienestar mental.
                            </p>
                            <p>
                                La diversidad de experiencias en eventos sociales también puede ofrecer nuevas
                                perspectivas y enfoques para abordar desafíos emocionales. El intercambio de ideas y la
                                exposición a diferentes formas de afrontar situaciones pueden enriquecer el repertorio
                                emocional de una persona y brindarle herramientas adicionales para manejar el estrés y
                                la ansiedad.
                            </p>
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
                            <p>
                                Los eventos sociales desempeñan un papel fundamental en la terapia mental al
                                proporcionar una plataforma en la que las personas pueden conectarse, compartir
                                experiencias y sentirse parte de una comunidad. La interacción social ofrece diversos
                                beneficios terapéuticos que contribuyen al bienestar mental.
                            </p>
                            <p>
                                La diversidad de experiencias en eventos sociales también puede ofrecer nuevas
                                perspectivas y enfoques para abordar desafíos emocionales. El intercambio de ideas y la
                                exposición a diferentes formas de afrontar situaciones pueden enriquecer el repertorio
                                emocional de una persona y brindarle herramientas adicionales para manejar el estrés y
                                la ansiedad.
                            </p>
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
                            <p>
                                Los eventos sociales desempeñan un papel fundamental en la terapia mental al
                                proporcionar una plataforma en la que las personas pueden conectarse, compartir
                                experiencias y sentirse parte de una comunidad. La interacción social ofrece diversos
                                beneficios terapéuticos que contribuyen al bienestar mental.
                            </p>
                            <p>
                                La diversidad de experiencias en eventos sociales también puede ofrecer nuevas
                                perspectivas y enfoques para abordar desafíos emocionales. El intercambio de ideas y la
                                exposición a diferentes formas de afrontar situaciones pueden enriquecer el repertorio
                                emocional de una persona y brindarle herramientas adicionales para manejar el estrés y
                                la ansiedad.
                            </p>
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
                            <p>
                                Los eventos sociales desempeñan un papel fundamental en la terapia mental al
                                proporcionar una plataforma en la que las personas pueden conectarse, compartir
                                experiencias y sentirse parte de una comunidad. La interacción social ofrece diversos
                                beneficios terapéuticos que contribuyen al bienestar mental.
                            </p>
                            <p>
                                La diversidad de experiencias en eventos sociales también puede ofrecer nuevas
                                perspectivas y enfoques para abordar desafíos emocionales. El intercambio de ideas y la
                                exposición a diferentes formas de afrontar situaciones pueden enriquecer el repertorio
                                emocional de una persona y brindarle herramientas adicionales para manejar el estrés y
                                la ansiedad.
                            </p>
                            <div className="text-center p-4">
                                <button className="bg-[#CAFAEF] rounded-full px-6 py-3">Inscribirme</button>
                            </div>
                        </>
                    }
                />
            </section>
            <div className="w-full flex flex-col items-center mb-6">
                <p className="px-6 text-sm text-[#444444]">Ver más</p>
            </div>
            <section className="w-full bg-[#39B2B2] px-4 py-8 flex flex-col gap-4">
                <p className="w-full text-center px-6 text-lg opacity-90 text-white">Esto ha pasado en el último mes</p>

                <div className="w-full shadow-[0px_0px_10.6px_0px_#C5FAED] rounded-[1.6rem] flex gap-2 bg-white py-3 px-6 items-center">
                    <Image src={'/image/events.png'} alt="icon" className="w-8 h-8" width={512} height={512} />
                    <p className="text-4xl text-[#249F9F]">6</p>
                    <p className="text-sm text-[#249F9F]">eventos a los que has asistido</p>
                </div>
            </section>
            <p className="px-6 mt-6 text-xl font-bold text-[#444]">Conociendo mi comunidad</p>
            <p className="px-6 mt-1 text-sm text-[#444]">
                Encuentra las personas y entidades que hacen posible estos espacios de encuentro
            </p>
            <p className="px-6 mt-6 text-md text-[#444]">Asociaciones</p>
            <div className="relative w-full grid grid-cols-3 px-16 py-4 gap-3">
                <SquareCard icon={'/image/association1.png'} title={'ACFAME'} />
                <SquareCard icon={'/image/association2.png'} title={'SMC'} />
                <SquareCard icon={'/image/association3.png'} title={'Federació veus'} />
            </div>
            <p className="px-6 mt-6 text-md text-[#444]">Profesionales del sector</p>
            <div className="relative w-full grid grid-cols-3 px-16 py-4 gap-3">
                <SquareCard icon={'/image/professional1.png'} title={'Laura Horcajo'} />
                <SquareCard icon={'/image/professional2.png'} title={'Dra. Sara Siddi'} />
                <SquareCard icon={'/image/professional3.png'} title={'Dr. Eduard'} />
            </div>
            <p className="px-6 mt-6 text-xl font-bold text-[#444]">Grupos de interés</p>
            <p className="px-6 mt-1 text-sm text-[#444]">Conoce a personas con los mismos intereses que tu</p>
            <div className="relative w-full grid grid-cols-3 px-16 py-4 gap-3 mb-6">
                <SquareCard icon={'/icon/interest1.png'} title={'Club del cine'} />
                <SquareCard icon={'/icon/interest2.png'} title={'Club de la lectura'} />
                <SquareCard icon={'/icon/interest3.png'} title={'Club del teatro'} />
                <SquareCard icon={'/icon/interest4.png'} title={'Club de las caminatas'} />
                <SquareCard icon={'/icon/interest5.png'} title={'Club del manga'} />
                <SquareCard icon={'/icon/interest6.png'} title={'Club de las plantas'} />
            </div>

            <BottomComponent
                title={'¿Tienes dudas sobre tu medicación?'}
                content={
                    <div className="flex flex-col gap-3">
                        <SlimCard
                            title={'¿Qué es la Duloxetina?'}
                            description={
                                'La duloxetina es un medicamento antidepresivo que también se utiliza para tratar trastornos de ansiedad y problemas de dolor crónico al modular los niveles de neurotransmisores en el cerebro, como la serotonina y la norepinefrina.'
                            }
                        />
                        <SlimCard
                            title={'¿En qué me ayuda la Duloxetina?'}
                            description={
                                'La duloxetina es un medicamento que ayuda a tratar la depresión, trastornos de ansiedad y problemas de dolor crónico al influir en los niveles de ciertos neurotransmisores en el cerebro, como la serotonina y la norepinefrina.'
                            }
                        />
                        <SlimCard
                            title={'¿Qué es el Lorazepam?'}
                            description={
                                '\n' +
                                'El lorazepam es un medicamento perteneciente a la clase de las benzodiazepinas, utilizado principalmente para el tratamiento de la ansiedad y trastornos relacionados, así como para controlar crisis convulsivas y ayudar en la sedación antes de procedimientos médicos.'
                            }
                        />
                    </div>
                }
            />
        </>
    );
}
