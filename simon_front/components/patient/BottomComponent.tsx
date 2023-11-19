import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
    title: string;
    subtitle?: string;
    content?: ReactNode;
    background?: boolean;
}

const BottomComponent = ({ title, subtitle, content, background }: Props) => {
    return (
        <div
            className={`relative overflow-hidden rounded-t-[2rem] w-full flex flex-col gap-2 p-8 ${
                background ? 'bg-[red]' : 'bg-[#39B2B2]'
            }`}
        >
            {background && (
                <Image
                    className="pointer-events-none select-none absolute w-full h-full opacity-20 object-cover"
                    src={'/image/bg.png'}
                    alt={'background'}
                    fill
                    priority
                />
            )}

            <h2
                className={`z-10 text-2xl opacity-90 w-full text-center font-semibold ${
                    background ? '' : 'text-white'
                }`}
            >
                {title}
            </h2>

            {subtitle && (
                <h6 className={`z-10 opacity-90 w-full text-center ${background ? '' : 'text-white'}`}>{subtitle}</h6>
            )}
            {content ?? null}

            <div className="z-10 w-full h-20 min-h-[5rem]" />
        </div>
    );
};

export default BottomComponent;
