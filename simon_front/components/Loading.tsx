import { RiLoader4Fill } from 'react-icons/ri';

const Loading = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <RiLoader4Fill className="w-12 h-12 animate-spin" />
        </div>
    );
};

export default Loading;
