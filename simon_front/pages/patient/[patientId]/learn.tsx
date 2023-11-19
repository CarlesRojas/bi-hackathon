import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import BottomComponent from '@/components/patient/BottomComponent';
import Card, { Tag, TagBackgroundColor, TagColor } from '@/components/patient/Card';
import Header from '@/components/patient/Header';
import { useUser } from '@/server/user';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return { props: { patientId: context.params?.patientId } };
}

export default function PatientLearn() {
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
                        src={'/icon/learn.png'}
                        alt="icon"
                        className="w-8 h-8 object-contain"
                        width={128}
                        height={128}
                    />
                }
                title={'Mi formación'}
                subtitle={'¡Aprende a cuidarte!'}
            />
            <p className="px-6 mt-6 text-lg text-[#39B2B2]">Encuentra información y mejora tus conocimientos</p>
            <div className="flex px-6 mt-6">
                <p
                    className="text-left text-xs font-semibold px-2 py-1 rounded-full w-fit mx-1"
                    style={{ color: TagColor[Tag.ARTICLE], backgroundColor: TagBackgroundColor[Tag.ARTICLE] }}
                >
                    {Tag.ARTICLE}
                </p>
                <p
                    className="text-left text-xs font-semibold px-2 py-1 rounded-full w-fit mx-1"
                    style={{ color: '#676BD9', backgroundColor: '#FFF' }}
                >
                    Formaciones
                </p>
                <p
                    className="text-left text-xs font-semibold px-2 py-1 rounded-full w-fit mx-1"
                    style={{ color: '#376E5A', backgroundColor: '#FFF' }}
                >
                    Cuestionarios
                </p>
            </div>
            <section className="relative p-6 flex flex-col items-center gap-2">
                <Card
                    image={'/image/formation1.png'}
                    showLike
                    isOpen
                    tag={Tag.ARTICLE}
                    title={'La primera visita al psicólogo: Preguntas frecuentes'}
                    subtitle={'Alberto Soler - 5 min'}
                    content={
                        <div className="relative flex flex-col gap-2 w-full">
                            <p>
                                Probablemente ya habrá pasado un tiempo desde que comenzaste a sentir que algo no iba
                                bien; lo que en principio sólo eran pequeños malos momentos que podías controlar, se han
                                ido haciendo más presentes en tu día a día hasta que has visto que te desbordaban.{' '}
                            </p>
                            <p>
                                Es posible que ya en ese momento te rondara por la cabeza la idea de consultar con un
                                psicólogo, un psiquiatra o “algo de eso”, pero decidiste esperar para ver si se pasaba y
                                te encontrabas mejor.{' '}
                            </p>
                            <p>
                                Pero pasaba el tiempo y veías que la cosa seguía igual, hasta que hace poco decidiste
                                que esto no podía seguir así, y te decidiste a llamar a ese psicólogo que te habían
                                recomendado o que habías encontrado tras horas de búsqueda. Bien, ya tienes tu primera
                                cita. ¿Y ahora qué? Con esta pequeña guía espero poder responder alguna de las dudas que
                                probablemente tendrás en este momento y hacer que tu primera visita a la consulta sea lo
                                más satisfactoria y provechosa para ti. Esta guía está elaborada en base a las dudas que
                                han tenido otras personas que han estado en el mismo punto en el que te encuentras tú
                                ahora. Espero que te sea de utilidad.
                            </p>
                            <p className="font-semibold">
                                “La psicoterapia es un tratamiento, ejercido por un profesional autorizado que utiliza
                                medios psicológicos para ayudar a resolver problemas humanos en el contexto de una
                                relación profesional”
                            </p>
                            <p>
                                La terapia psicológica está dirigida principalmente a dos grupos de personas: Por un
                                lado, está orientada a aquellas personas que presentan un trastorno psicológico (por
                                ejemplo, ansiedad, depresión, fobias, anorexia, bulimia, adicciones, etc.){' '}
                            </p>
                            <p>
                                En estos casos, el objetivo principal de la terapia será, en primer lugar, el control de
                                los síntomas que se presenten y el aprendizaje de estrategias y habilidades que
                                prevengan la reaparición de los síntomas. Por otro lado, la psicoterapia también está
                                orientada al crecimiento personal y a la solución de problemas. No es necesario
                                presentar un trastorno psicológico para poder beneficiarse de la ayuda psicoterapéutica.
                            </p>
                        </div>
                    }
                />
                <Card
                    image={'/image/formation2.png'}
                    showLike
                    tag={Tag.ARTICLE}
                    title={'No estoy bien: ¿Qué puedo hacer?'}
                    subtitle={'Henka Centros Educativos - 5 min'}
                    content={
                        <div className="relative flex flex-col gap-2 w-full">
                            <p>
                                Probablemente ya habrá pasado un tiempo desde que comenzaste a sentir que algo no iba
                                bien; lo que en principio sólo eran pequeños malos momentos que podías controlar, se han
                                ido haciendo más presentes en tu día a día hasta que has visto que te desbordaban.{' '}
                            </p>
                            <p>
                                Es posible que ya en ese momento te rondara por la cabeza la idea de consultar con un
                                psicólogo, un psiquiatra o “algo de eso”, pero decidiste esperar para ver si se pasaba y
                                te encontrabas mejor.{' '}
                            </p>
                            <p>
                                Pero pasaba el tiempo y veías que la cosa seguía igual, hasta que hace poco decidiste
                                que esto no podía seguir así, y te decidiste a llamar a ese psicólogo que te habían
                                recomendado o que habías encontrado tras horas de búsqueda. Bien, ya tienes tu primera
                                cita. ¿Y ahora qué? Con esta pequeña guía espero poder responder alguna de las dudas que
                                probablemente tendrás en este momento y hacer que tu primera visita a la consulta sea lo
                                más satisfactoria y provechosa para ti. Esta guía está elaborada en base a las dudas que
                                han tenido otras personas que han estado en el mismo punto en el que te encuentras tú
                                ahora. Espero que te sea de utilidad.
                            </p>
                            <p className="font-semibold">
                                “La psicoterapia es un tratamiento, ejercido por un profesional autorizado que utiliza
                                medios psicológicos para ayudar a resolver problemas humanos en el contexto de una
                                relación profesional”
                            </p>
                            <p>
                                La terapia psicológica está dirigida principalmente a dos grupos de personas: Por un
                                lado, está orientada a aquellas personas que presentan un trastorno psicológico (por
                                ejemplo, ansiedad, depresión, fobias, anorexia, bulimia, adicciones, etc.){' '}
                            </p>
                            <p>
                                En estos casos, el objetivo principal de la terapia será, en primer lugar, el control de
                                los síntomas que se presenten y el aprendizaje de estrategias y habilidades que
                                prevengan la reaparición de los síntomas. Por otro lado, la psicoterapia también está
                                orientada al crecimiento personal y a la solución de problemas. No es necesario
                                presentar un trastorno psicológico para poder beneficiarse de la ayuda psicoterapéutica.
                            </p>
                        </div>
                    }
                />
                <Card
                    image={'/image/formation3.png'}
                    showLike
                    tag={Tag.ARTICLE}
                    title={'¿Sabes que preguntar en tu consulta al psicólogo?'}
                    subtitle={'Georgina Méndez - 5 min'}
                    content={
                        <div className="relative flex flex-col gap-2 w-full">
                            <p>
                                Probablemente ya habrá pasado un tiempo desde que comenzaste a sentir que algo no iba
                                bien; lo que en principio sólo eran pequeños malos momentos que podías controlar, se han
                                ido haciendo más presentes en tu día a día hasta que has visto que te desbordaban.{' '}
                            </p>
                            <p>
                                Es posible que ya en ese momento te rondara por la cabeza la idea de consultar con un
                                psicólogo, un psiquiatra o “algo de eso”, pero decidiste esperar para ver si se pasaba y
                                te encontrabas mejor.{' '}
                            </p>
                            <p>
                                Pero pasaba el tiempo y veías que la cosa seguía igual, hasta que hace poco decidiste
                                que esto no podía seguir así, y te decidiste a llamar a ese psicólogo que te habían
                                recomendado o que habías encontrado tras horas de búsqueda. Bien, ya tienes tu primera
                                cita. ¿Y ahora qué? Con esta pequeña guía espero poder responder alguna de las dudas que
                                probablemente tendrás en este momento y hacer que tu primera visita a la consulta sea lo
                                más satisfactoria y provechosa para ti. Esta guía está elaborada en base a las dudas que
                                han tenido otras personas que han estado en el mismo punto en el que te encuentras tú
                                ahora. Espero que te sea de utilidad.
                            </p>
                            <p className="font-semibold">
                                “La psicoterapia es un tratamiento, ejercido por un profesional autorizado que utiliza
                                medios psicológicos para ayudar a resolver problemas humanos en el contexto de una
                                relación profesional”
                            </p>
                            <p>
                                La terapia psicológica está dirigida principalmente a dos grupos de personas: Por un
                                lado, está orientada a aquellas personas que presentan un trastorno psicológico (por
                                ejemplo, ansiedad, depresión, fobias, anorexia, bulimia, adicciones, etc.){' '}
                            </p>
                            <p>
                                En estos casos, el objetivo principal de la terapia será, en primer lugar, el control de
                                los síntomas que se presenten y el aprendizaje de estrategias y habilidades que
                                prevengan la reaparición de los síntomas. Por otro lado, la psicoterapia también está
                                orientada al crecimiento personal y a la solución de problemas. No es necesario
                                presentar un trastorno psicológico para poder beneficiarse de la ayuda psicoterapéutica.
                            </p>
                        </div>
                    }
                />
                <Card
                    image={'/image/formation4.png'}
                    showLike
                    tag={Tag.ARTICLE}
                    title={'El papel de la familia y del entorno de las personas'}
                    subtitle={'ACFAME - 5 min'}
                    content={
                        <div className="relative flex flex-col gap-2 w-full">
                            <p>
                                Probablemente ya habrá pasado un tiempo desde que comenzaste a sentir que algo no iba
                                bien; lo que en principio sólo eran pequeños malos momentos que podías controlar, se han
                                ido haciendo más presentes en tu día a día hasta que has visto que te desbordaban.{' '}
                            </p>
                            <p>
                                Es posible que ya en ese momento te rondara por la cabeza la idea de consultar con un
                                psicólogo, un psiquiatra o “algo de eso”, pero decidiste esperar para ver si se pasaba y
                                te encontrabas mejor.{' '}
                            </p>
                            <p>
                                Pero pasaba el tiempo y veías que la cosa seguía igual, hasta que hace poco decidiste
                                que esto no podía seguir así, y te decidiste a llamar a ese psicólogo que te habían
                                recomendado o que habías encontrado tras horas de búsqueda. Bien, ya tienes tu primera
                                cita. ¿Y ahora qué? Con esta pequeña guía espero poder responder alguna de las dudas que
                                probablemente tendrás en este momento y hacer que tu primera visita a la consulta sea lo
                                más satisfactoria y provechosa para ti. Esta guía está elaborada en base a las dudas que
                                han tenido otras personas que han estado en el mismo punto en el que te encuentras tú
                                ahora. Espero que te sea de utilidad.
                            </p>
                            <p className="font-semibold">
                                “La psicoterapia es un tratamiento, ejercido por un profesional autorizado que utiliza
                                medios psicológicos para ayudar a resolver problemas humanos en el contexto de una
                                relación profesional”
                            </p>
                            <p>
                                La terapia psicológica está dirigida principalmente a dos grupos de personas: Por un
                                lado, está orientada a aquellas personas que presentan un trastorno psicológico (por
                                ejemplo, ansiedad, depresión, fobias, anorexia, bulimia, adicciones, etc.){' '}
                            </p>
                            <p>
                                En estos casos, el objetivo principal de la terapia será, en primer lugar, el control de
                                los síntomas que se presenten y el aprendizaje de estrategias y habilidades que
                                prevengan la reaparición de los síntomas. Por otro lado, la psicoterapia también está
                                orientada al crecimiento personal y a la solución de problemas. No es necesario
                                presentar un trastorno psicológico para poder beneficiarse de la ayuda psicoterapéutica.
                            </p>
                        </div>
                    }
                />
            </section>
            <div className="w-full flex flex-col items-center">
                <p className="px-6 text-sm text-[#444444]">Ver más</p>
            </div>
            <p className="px-6 mt-6 text-lg text-[#39B2B2] text-center">
                ¡Tu planta está aprendiendo y creciendo contigo!
            </p>
            <Image
                src={'/image/main_plant.png'}
                alt="icon"
                className="w-full px-16 py-4 object-contain"
                width={512}
                height={512}
            />
            <p className="px-6 text-md text-[#444]">
                Esto es todo lo que estás haciendo para cuidar de ti y de tu planta
            </p>
            <p className="px-6 mt-6 text-xl font-bold text-[#444]">Mis formaciones realizadas</p>
            <p className="px-6 mt-1 text-sm text-[#444]">¡Has aprendido todo esto!</p>
            <section className="relative p-6 flex flex-col items-center gap-2">
                <Card
                    image={'/image/formation5.png'}
                    showLike
                    tag={Tag.ARTICLE}
                    title={'La recuperación desde la mirada de sus protagonistas'}
                    subtitle={'Marta Tena - 5 min'}
                    content={
                        <div className="relative flex flex-col gap-2 w-full">
                            <p>
                                Probablemente ya habrá pasado un tiempo desde que comenzaste a sentir que algo no iba
                                bien; lo que en principio sólo eran pequeños malos momentos que podías controlar, se han
                                ido haciendo más presentes en tu día a día hasta que has visto que te desbordaban.{' '}
                            </p>
                            <p>
                                Es posible que ya en ese momento te rondara por la cabeza la idea de consultar con un
                                psicólogo, un psiquiatra o “algo de eso”, pero decidiste esperar para ver si se pasaba y
                                te encontrabas mejor.{' '}
                            </p>
                            <p>
                                Pero pasaba el tiempo y veías que la cosa seguía igual, hasta que hace poco decidiste
                                que esto no podía seguir así, y te decidiste a llamar a ese psicólogo que te habían
                                recomendado o que habías encontrado tras horas de búsqueda. Bien, ya tienes tu primera
                                cita. ¿Y ahora qué? Con esta pequeña guía espero poder responder alguna de las dudas que
                                probablemente tendrás en este momento y hacer que tu primera visita a la consulta sea lo
                                más satisfactoria y provechosa para ti. Esta guía está elaborada en base a las dudas que
                                han tenido otras personas que han estado en el mismo punto en el que te encuentras tú
                                ahora. Espero que te sea de utilidad.
                            </p>
                            <p className="font-semibold">
                                “La psicoterapia es un tratamiento, ejercido por un profesional autorizado que utiliza
                                medios psicológicos para ayudar a resolver problemas humanos en el contexto de una
                                relación profesional”
                            </p>
                            <p>
                                La terapia psicológica está dirigida principalmente a dos grupos de personas: Por un
                                lado, está orientada a aquellas personas que presentan un trastorno psicológico (por
                                ejemplo, ansiedad, depresión, fobias, anorexia, bulimia, adicciones, etc.){' '}
                            </p>
                            <p>
                                En estos casos, el objetivo principal de la terapia será, en primer lugar, el control de
                                los síntomas que se presenten y el aprendizaje de estrategias y habilidades que
                                prevengan la reaparición de los síntomas. Por otro lado, la psicoterapia también está
                                orientada al crecimiento personal y a la solución de problemas. No es necesario
                                presentar un trastorno psicológico para poder beneficiarse de la ayuda psicoterapéutica.
                            </p>
                        </div>
                    }
                />
                <Card
                    image={'/image/formation6.png'}
                    showLike
                    tag={Tag.FORMATIONS}
                    title={'¿Tenemos buena salud mental?'}
                    subtitle={'Enrique López - 5 min'}
                    content={
                        <div className="relative flex flex-col gap-2 w-full">
                            <p>
                                Probablemente ya habrá pasado un tiempo desde que comenzaste a sentir que algo no iba
                                bien; lo que en principio sólo eran pequeños malos momentos que podías controlar, se han
                                ido haciendo más presentes en tu día a día hasta que has visto que te desbordaban.{' '}
                            </p>
                            <p>
                                Es posible que ya en ese momento te rondara por la cabeza la idea de consultar con un
                                psicólogo, un psiquiatra o “algo de eso”, pero decidiste esperar para ver si se pasaba y
                                te encontrabas mejor.{' '}
                            </p>
                            <p>
                                Pero pasaba el tiempo y veías que la cosa seguía igual, hasta que hace poco decidiste
                                que esto no podía seguir así, y te decidiste a llamar a ese psicólogo que te habían
                                recomendado o que habías encontrado tras horas de búsqueda. Bien, ya tienes tu primera
                                cita. ¿Y ahora qué? Con esta pequeña guía espero poder responder alguna de las dudas que
                                probablemente tendrás en este momento y hacer que tu primera visita a la consulta sea lo
                                más satisfactoria y provechosa para ti. Esta guía está elaborada en base a las dudas que
                                han tenido otras personas que han estado en el mismo punto en el que te encuentras tú
                                ahora. Espero que te sea de utilidad.
                            </p>
                            <p className="font-semibold">
                                “La psicoterapia es un tratamiento, ejercido por un profesional autorizado que utiliza
                                medios psicológicos para ayudar a resolver problemas humanos en el contexto de una
                                relación profesional”
                            </p>
                            <p>
                                La terapia psicológica está dirigida principalmente a dos grupos de personas: Por un
                                lado, está orientada a aquellas personas que presentan un trastorno psicológico (por
                                ejemplo, ansiedad, depresión, fobias, anorexia, bulimia, adicciones, etc.){' '}
                            </p>
                            <p>
                                En estos casos, el objetivo principal de la terapia será, en primer lugar, el control de
                                los síntomas que se presenten y el aprendizaje de estrategias y habilidades que
                                prevengan la reaparición de los síntomas. Por otro lado, la psicoterapia también está
                                orientada al crecimiento personal y a la solución de problemas. No es necesario
                                presentar un trastorno psicológico para poder beneficiarse de la ayuda psicoterapéutica.
                            </p>
                        </div>
                    }
                />
            </section>
            <div className="w-full flex flex-col items-center">
                <p className="px-6 text-sm text-[#444444]">Ver más</p>
            </div>
            <p className="px-6 mt-6 text-xl font-bold text-[#444]">Mis favoritos</p>
            <p className="px-6 mt-1 text-sm text-[#444]">Has marcado como favorito las siguientes formaciones</p>
            <section className="relative p-6 flex flex-col items-center gap-2">
                <Card
                    image={'/image/formation7.png'}
                    showLike
                    isLike
                    tag={Tag.ARTICLE}
                    title={'7 consejos para gestionar la ansiedad'}
                    subtitle={'Marta Tena - 5 min'}
                    content={
                        <div className="relative flex flex-col gap-2 w-full">
                            <p>
                                Probablemente ya habrá pasado un tiempo desde que comenzaste a sentir que algo no iba
                                bien; lo que en principio sólo eran pequeños malos momentos que podías controlar, se han
                                ido haciendo más presentes en tu día a día hasta que has visto que te desbordaban.{' '}
                            </p>
                            <p>
                                Es posible que ya en ese momento te rondara por la cabeza la idea de consultar con un
                                psicólogo, un psiquiatra o “algo de eso”, pero decidiste esperar para ver si se pasaba y
                                te encontrabas mejor.{' '}
                            </p>
                            <p>
                                Pero pasaba el tiempo y veías que la cosa seguía igual, hasta que hace poco decidiste
                                que esto no podía seguir así, y te decidiste a llamar a ese psicólogo que te habían
                                recomendado o que habías encontrado tras horas de búsqueda. Bien, ya tienes tu primera
                                cita. ¿Y ahora qué? Con esta pequeña guía espero poder responder alguna de las dudas que
                                probablemente tendrás en este momento y hacer que tu primera visita a la consulta sea lo
                                más satisfactoria y provechosa para ti. Esta guía está elaborada en base a las dudas que
                                han tenido otras personas que han estado en el mismo punto en el que te encuentras tú
                                ahora. Espero que te sea de utilidad.
                            </p>
                            <p className="font-semibold">
                                “La psicoterapia es un tratamiento, ejercido por un profesional autorizado que utiliza
                                medios psicológicos para ayudar a resolver problemas humanos en el contexto de una
                                relación profesional”
                            </p>
                            <p>
                                La terapia psicológica está dirigida principalmente a dos grupos de personas: Por un
                                lado, está orientada a aquellas personas que presentan un trastorno psicológico (por
                                ejemplo, ansiedad, depresión, fobias, anorexia, bulimia, adicciones, etc.){' '}
                            </p>
                            <p>
                                En estos casos, el objetivo principal de la terapia será, en primer lugar, el control de
                                los síntomas que se presenten y el aprendizaje de estrategias y habilidades que
                                prevengan la reaparición de los síntomas. Por otro lado, la psicoterapia también está
                                orientada al crecimiento personal y a la solución de problemas. No es necesario
                                presentar un trastorno psicológico para poder beneficiarse de la ayuda psicoterapéutica.
                            </p>
                        </div>
                    }
                />
                <Card
                    image={'/image/formation8.png'}
                    showLike
                    isLike
                    tag={Tag.FORMATIONS}
                    title={'¿Cómo gestiono mis miedos?'}
                    subtitle={'Francisco Moruna - 5 min'}
                    content={
                        <div className="relative flex flex-col gap-2 w-full">
                            <p>
                                Probablemente ya habrá pasado un tiempo desde que comenzaste a sentir que algo no iba
                                bien; lo que en principio sólo eran pequeños malos momentos que podías controlar, se han
                                ido haciendo más presentes en tu día a día hasta que has visto que te desbordaban.{' '}
                            </p>
                            <p>
                                Es posible que ya en ese momento te rondara por la cabeza la idea de consultar con un
                                psicólogo, un psiquiatra o “algo de eso”, pero decidiste esperar para ver si se pasaba y
                                te encontrabas mejor.{' '}
                            </p>
                            <p>
                                Pero pasaba el tiempo y veías que la cosa seguía igual, hasta que hace poco decidiste
                                que esto no podía seguir así, y te decidiste a llamar a ese psicólogo que te habían
                                recomendado o que habías encontrado tras horas de búsqueda. Bien, ya tienes tu primera
                                cita. ¿Y ahora qué? Con esta pequeña guía espero poder responder alguna de las dudas que
                                probablemente tendrás en este momento y hacer que tu primera visita a la consulta sea lo
                                más satisfactoria y provechosa para ti. Esta guía está elaborada en base a las dudas que
                                han tenido otras personas que han estado en el mismo punto en el que te encuentras tú
                                ahora. Espero que te sea de utilidad.
                            </p>
                            <p className="font-semibold">
                                “La psicoterapia es un tratamiento, ejercido por un profesional autorizado que utiliza
                                medios psicológicos para ayudar a resolver problemas humanos en el contexto de una
                                relación profesional”
                            </p>
                            <p>
                                La terapia psicológica está dirigida principalmente a dos grupos de personas: Por un
                                lado, está orientada a aquellas personas que presentan un trastorno psicológico (por
                                ejemplo, ansiedad, depresión, fobias, anorexia, bulimia, adicciones, etc.){' '}
                            </p>
                            <p>
                                En estos casos, el objetivo principal de la terapia será, en primer lugar, el control de
                                los síntomas que se presenten y el aprendizaje de estrategias y habilidades que
                                prevengan la reaparición de los síntomas. Por otro lado, la psicoterapia también está
                                orientada al crecimiento personal y a la solución de problemas. No es necesario
                                presentar un trastorno psicológico para poder beneficiarse de la ayuda psicoterapéutica.
                            </p>
                        </div>
                    }
                />
            </section>
            <div className="w-full flex flex-col items-center mb-6">
                <p className="px-6 text-sm text-[#444444]">Ver más</p>
            </div>

            <BottomComponent title={'¿Tienes dudas sobre tu medicación?'} />
        </>
    );
}
