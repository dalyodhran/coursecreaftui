import React from 'react';
import { Globe, Share2 } from 'lucide-react';

export const LandingFooter: React.FC = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="w-full py-16 px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="text-2xl font-black text-on-surface tracking-tighter">CourseCrafter</div>
                        <p className="text-sm text-on-surface-variant font-medium">© 2024 CourseCrafter. Precision in Motion.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        <a className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4 text-sm font-bold uppercase tracking-widest" href="#">Support</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4 text-sm font-bold uppercase tracking-widest" href="#">Privacy Policy</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4 text-sm font-bold uppercase tracking-widest" href="#">Terms of Service</a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4 text-sm font-bold uppercase tracking-widest" href="#">Contact</a>
                    </div>
                    <div className="flex gap-6">
                        <Globe className="text-slate-400 cursor-pointer hover:text-primary transition-colors h-6 w-6" />
                        <Share2 className="text-slate-400 cursor-pointer hover:text-primary transition-colors h-6 w-6" />
                    </div>
                </div>
            </div>
        </footer>
    );
};
