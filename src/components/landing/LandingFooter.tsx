import React from 'react';
import { Globe, Share2 } from 'lucide-react';

export const LandingFooter: React.FC = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="w-full py-12 px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="text-lg font-bold text-slate-900">CourseCrafter</div>
                        <p className="font-['Lexend'] text-sm text-slate-500">© 2024 CourseCrafter. Precision in Motion.</p>
                    </div>
                    <div className="flex gap-8">
                        <a className="text-slate-500 hover:text-blue-600 transition-colors hover:underline decoration-2 underline-offset-4 text-sm" href="#">Support</a>
                        <a className="text-slate-500 hover:text-blue-600 transition-colors hover:underline decoration-2 underline-offset-4 text-sm" href="#">Privacy Policy</a>
                        <a className="text-slate-500 hover:text-blue-600 transition-colors hover:underline decoration-2 underline-offset-4 text-sm" href="#">Terms of Service</a>
                        <a className="text-slate-500 hover:text-blue-600 transition-colors hover:underline decoration-2 underline-offset-4 text-sm" href="#">Contact</a>
                    </div>
                    <div className="flex gap-4">
                        <Globe className="text-slate-400 cursor-pointer hover:text-primary transition-colors h-5 w-5" />
                        <Share2 className="text-slate-400 cursor-pointer hover:text-primary transition-colors h-5 w-5" />
                    </div>
                </div>
            </div>
        </footer>
    );
};
