import { ReactNode } from 'react';


interface Props {
    icon: ReactNode;
    title: string;
    subtitle: string;
}

const Header = ({ icon, title, subtitle }: Props) => {
    return (
        <div className="bg-white opacity-70 rounded-b-[3rem] shadow-xl">
            <div className="w-full flex flex-col items-center py-12 px-6 text-center">
                <div className="w-fit flex gap-3 pb-5 text-[#265A38]">
                    {icon}
                    <h1 className="text-2xl">{title}</h1>
                </div>
                <h6 className="text-[#444444]">{subtitle}</h6>
            </div>
        </div>
    );
};

export default Header;
