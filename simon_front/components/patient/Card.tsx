import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

export enum Tag {
    MED = 'Prioritario',
    CITA = 'Citas médicas',
    EDU = 'Formaciones',
    EVENT = 'Evento'
}

interface Props {
    image: string;
    tag: Tag;
    title: string;
    subtitle: string;
    description?: string;
    content?: ReactNode;
    onClick?: () => void;
}

const TagBackgroundColor: Record<Tag, string> = {
    [Tag.MED]: '#FFE769',
    [Tag.CITA]: '#BBECDA',
    [Tag.EDU]: '#BABCF7',
    [Tag.EVENT]: '#FFBCC0'
};

const TagColor: Record<Tag, string> = {
    [Tag.MED]: '#998207',
    [Tag.CITA]: '#376E5A',
    [Tag.EDU]: '#676BD9',
    [Tag.EVENT]: '#B3565B'
};

const Card = ({ image, tag, title, subtitle, description, content, onClick }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full h-fit flex flex-col gap-2 rounded-lg bg-white">
            <button
                type="button"
                onClick={() => {
                    onClick?.();
                    setOpen((prev) => !prev);
                }}
                className="w-full h-fit grid grid-cols-[1fr_3fr_0.3fr] gap-2 p-2"
            >
                <Image src={image} alt={title} width={128} height={128} />

                <div className="w-full flex flex-col">
                    <p
                        className="text-left text-xs font-semibold px-2 py-1 rounded-full w-fit"
                        style={{ color: TagColor[tag], backgroundColor: TagBackgroundColor[tag] }}
                    >
                        {tag}
                    </p>
                    <h3 className="text-left text-md font-medium">{title}</h3>
                    <p className="text-left text-xs ">{subtitle}</p>
                    <p className="text-left text-xs opacity-50">{description}</p>
                </div>

                <div className="relative w-full h-full flex items-center justify-center opacity-60">
                    <RiArrowRightSLine className="w-6 h-6" />
                </div>
            </button>

            {open && content ? <div className="w-full h-fit p-2">{content}</div> : null}
        </div>
    );
};

export default Card;
