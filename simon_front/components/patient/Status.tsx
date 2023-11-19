import Image from 'next/image';
import { useState } from 'react';

interface Mood {
    src: string;
    text: string;
    subtitle: string;
}

const MOODS: Mood[] = [
    { src: '/image/emoji_0.png', text: 'Feliz', subtitle: '¡Hoy es un gran día!' },
    { src: '/image/emoji_1.png', text: 'Cansado', subtitle: 'Tómate un tiempo para ti' },
    { src: '/image/emoji_2.png', text: 'Asustado', subtitle: 'Recuerda, todo estará bien' },
    { src: '/image/emoji_3.png', text: 'Animado', subtitle: '¡Te ves increíble!' },
    { src: '/image/emoji_4.png', text: 'Triste', subtitle: 'Deja que las emociones fluyan' }
];
export const Status = () => {
    const [selected, setSelected] = useState<Mood | null>(null);

    return selected ? (
        <fieldset className="gap-2 w-full grid grid-cols-5 bg-white bg-opacity-90 rounded-lg pb-3">
            <div className="flex flex-col">
                <div className="w-full p-3 pb-1">
                    <Image
                        className="w-full h-full rounded-b-3xl"
                        src={selected.src}
                        alt={`icono ${selected.src}`}
                        width={512}
                        height={512}
                    />
                </div>

                <span className="w-full text-center text-xs text-gray-800">{selected.text}</span>
            </div>

            <div className="flex items-center col-span-4">
                <p className="pl-4 w-full text-lg text-gray-800">{selected.subtitle}</p>
            </div>
        </fieldset>
    ) : (
        <fieldset className="gap-2 w-full grid grid-cols-5">
            {MOODS.map(({ src, text, subtitle }) => (
                <label key={text}>
                    <input
                        type="radio"
                        name="animo"
                        className="hidden peer"
                        onClick={() => setSelected({ src, text, subtitle })}
                    />

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
    );
};
