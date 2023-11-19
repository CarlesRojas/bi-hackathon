import { ReactNode, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';


interface Props {
    title: string;
    description: string;
    isOpen?: boolean;
    onClick?: () => void;
}

const Card = ({ isOpen, title, description, onClick }: Props) => {
    const [open, setOpen] = useState(isOpen ?? false);

    return (
        <div className="w-full h-fit flex flex-col gap-2 rounded-xl bg-white">
            <button
                type="button"
                onClick={() => {
                    onClick?.();
                    setOpen((prev) => !prev);
                }}
                className="w-full h-fit flex justify-between gap-2 p-3 rounded-lg bg-white"
            >
                <div className="w-full flex flex-col">
                    <h3 className="text-left text-md font-medium">{title}</h3>
                </div>

                <div className="relative w-fit h-full flex items-center justify-center opacity-60">
                    <RiArrowRightSLine className="w-6 h-6" />
                </div>
            </button>

            {open && description ? <div className="w-full h-fit p-3">{description}</div> : null}
        </div>
    );
};

export default Card;
