import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

export enum Tag {
    MED = 'Prioritario',
    CITA = 'Citas médicas',
    EDU = 'Educación',
    EVENT = 'Evento',
    ARTICLE = 'Artículo',
    FORMATIONS = 'Formaciones',
    TALK = 'Charla',
    INTEREST_GROUP = 'Grupo de interés'
}

interface Props {
    image: string;
    tag: Tag;
    showLike?: boolean;
    isLike?: boolean;
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
    [Tag.FORMATIONS]: '#C5D3F7',
    [Tag.TALK]: '#C4C6FF',
    [Tag.INTEREST_GROUP]: '#95E8CA'
};

export const TagColor: Record<Tag, string> = {
    [Tag.MED]: '#998207',
    [Tag.CITA]: '#376E5A',
    [Tag.EDU]: '#676BD9',
    [Tag.EVENT]: '#B3565B',
    [Tag.ARTICLE]: '#B3565B',
    [Tag.FORMATIONS]: '#4A65AA',
    [Tag.TALK]: '#595CD4',
    [Tag.INTEREST_GROUP]: '#518170'
};

const Card = ({ image, tag, showLike, isLike, title, subtitle, description, content, onClick }: Props) => {
    const [open, setOpen] = useState(false);
    const [liked, setLiked] = useState(isLike);

    return (
        <div className="w-full h-fit flex flex-col gap-2 rounded-lg bg-white">
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
                    <div className="w-full flex justify-between">
                        <p
                            className="text-left text-xs font-semibold px-2 py-1 rounded-full w-fit"
                            style={{ color: TagColor[tag], backgroundColor: TagBackgroundColor[tag] }}
                        >
                            {tag}
                        </p>
                        {showLike ? <button onClick={(e)=>{
                            e.stopPropagation()
                            setLiked(prevState => !prevState)
                        }}>
                            <Image
                                src={liked ? '/icon/like2.png' : '/icon/like.png'}
                                alt="icon"
                                className="w-4 h-4 object-contain "
                                width={128}
                                height={128}
                            />
                        </button> : null}
                    </div>
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
