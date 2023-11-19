import { RiLoader4Fill } from 'react-icons/ri';

const Loading = () => {
    return (
        <div className="w-full h-full min-h-screen flex items-center justify-center">
            <RiLoader4Fill className="w-10 h-10 animate-spin text-[#39B2B2]" />
        </div>
    );
};

export default Loading;
