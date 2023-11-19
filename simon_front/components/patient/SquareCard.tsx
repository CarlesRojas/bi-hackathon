import Image from 'next/image';
import {RiCircleFill, RiCircleLine} from 'react-icons/ri';


interface Props {
    icon: string;
    title: string;
}

const Card = ({ icon, title }: Props) => {

    return (
        <label
            key={title}
            className="flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg p-2 gap-2"
            style={{ boxShadow: '0px 0px 4px 2px rgba(38, 123, 102, 0.25)' }}
        >
            <Image src={icon} className="w-16 h-16" alt="symptom icon" width={256} height={256} />
            <p className="text-sm font-semibold peer-disabled:opacity-30 text-center">{title}</p>
        </label>
    );
};

export default Card;
