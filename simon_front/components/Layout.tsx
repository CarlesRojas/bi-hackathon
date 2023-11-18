import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const Layout = ({ children, patientId }: { children: ReactNode; patientId?: string }) => {
    const { pathname } = useRouter();

    const NavItems = [
        {
            image: '/icon/home.png',
            link: `/patient/${patientId}`,
            isOpen: pathname === `/patient/[patientId]`
        },
        {
            image: '/icon/learn.png',
            link: `/patient/${patientId}/learn`,
            isOpen: pathname === `/patient/[patientId]/learn`
        },
        {
            image: '/icon/meds.png',
            link: `/patient/${patientId}/medication`,
            isOpen: pathname === `/patient/[patientId]/medication`
        },
        {
            image: '/icon/community.png',
            link: `/patient/${patientId}/community`,
            isOpen: pathname === `/patient/[patientId]/community`
        },
        {
            image: '/icon/profile.png',
            link: `/patient/${patientId}/profile`,
            isOpen: pathname === `/patient/[patientId]/profile`
        }
    ];

    return (
        <div className="w-full h-full flex flex-col overflow-x-hidden overflow-y-auto">
            {children}

            {patientId && (
                <>
                    <div className="w-full h-20 min-h-[5rem]" />

                    <nav className="fixed w-full h-20 left-0 bottom-0 p-2">
                        <div className="relative w-full h-16 rounded-full bg-white border border-gray-200 grid grid-cols-5 shadow-xl px-4">
                            {NavItems.map(({ image, link, isOpen }, i) => (
                                <Link
                                    key={i}
                                    href={link}
                                    className={`relative w-full h-16 flex items-center justify-center p-5 ${
                                        isOpen ? '' : 'opacity-30'
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt="icon"
                                        className="w-full h-full object-contain"
                                        width={128}
                                        height={128}
                                    />
                                </Link>
                            ))}
                        </div>
                    </nav>
                </>
            )}
        </div>
    );
};

export default Layout;
