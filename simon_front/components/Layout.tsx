import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-full flex flex-col overflow-x-hidden overflow-y-auto">
            {children}

            <div className="w-full h-20 min-h-[5rem]" />

            <footer className="absolute w-full h-20 left-0 bottom-0 bg-red-400"></footer>
        </div>
    );
};

export default Layout;
