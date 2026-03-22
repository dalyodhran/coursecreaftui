import React from 'react';

export const LandingNavBar: React.FC = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl glass-nav">
            <div className="flex justify-center items-center px-8 h-16 max-w-[1920px] mx-auto">
                <div className="text-2xl font-black text-blue-700 tracking-tighter">CourseCrafter</div>
            </div>
            <div className="bg-slate-100 h-[1px] w-full"></div>
        </nav>
    );
};
