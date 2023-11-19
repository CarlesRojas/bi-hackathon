import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

export enum Tag {
    MED = 'Prioritario',
    CITA = 'Citas médicas',
    EDU = 'Educación',
    EVENT = 'Evento',
    ARTICLE = 'Artículo',
    FORMATIONS = 'Formaciones'
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

export const TagBackgroundColor: Record<Tag, string> = {
    [Tag.MED]: '#FFE769',
    [Tag.CITA]: '#BBECDA',
    [Tag.EDU]: '#BABCF7',
    [Tag.EVENT]: '#FFBCC0',
    [Tag.ARTICLE]: '#FFBCC0',
    [Tag.FORMATIONS]: '#C5D3F7'
};

export const TagColor: Record<Tag, string> = {
    [Tag.MED]: '#998207',
    [Tag.CITA]: '#376E5A',
    [Tag.EDU]: '#676BD9',
    [Tag.EVENT]: '#B3565B',
    [Tag.ARTICLE]: '#B3565B',
    [Tag.FORMATIONS]: '#4A65AA'
};

const Card = ({ image, tag, title, subtitle, description, content, onClick }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <button
            type="button"
            onClick={() => {
                onClick?.();
                setOpen((prev) => !prev);
            }}
            className="w-full h-fit grid grid-cols-[1fr_3fr_0.3fr] gap-2 p-2 rounded-lg bg-white"
        >
            <Image className="rounded-md" src={image} alt={title} width={128} height={128} />

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

            {open && content ? content : null}
        </button>
    );
};

export default Card;
