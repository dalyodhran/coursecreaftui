import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from 'react-oidc-context';

export const LandingNavBar: React.FC = () => {
    const auth = useAuth();

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl glass-nav border-b border-slate-100">
            <div className="flex justify-between items-center px-8 h-16 max-w-[1920px] mx-auto">
                <div className="text-2xl font-black text-blue-700 tracking-tighter">CourseCrafter</div>
                <div className="flex items-center gap-4">
                    {!auth.isAuthenticated && (
                        <Button 
                            variant="ghost" 
                            onClick={() => auth.signinRedirect()}
                            className="font-bold text-slate-600 hover:text-primary transition-colors"
                        >
                            Log In
                        </Button>
                    )}
                    <Button 
                        onClick={() => auth.signinRedirect()}
                        className="font-bold kinetic-gradient text-white rounded-full px-6"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    );
};
