import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from 'react-oidc-context';
import { Bell, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const LandingNavBar: React.FC = () => {
    const auth = useAuth();

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl glass-nav border-b border-slate-100">
            <div className="flex justify-between items-center px-8 h-16 max-w-[1920px] mx-auto">
                <div className="text-2xl font-black text-blue-700 tracking-tighter">CourseCrafter</div>

                <div className="flex items-center gap-4">
                    {auth.isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-50 rounded-lg transition-all active:scale-95">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-50 rounded-lg transition-all active:scale-95">
                                <Settings className="h-5 w-5" />
                            </Button>
                            <Avatar className="w-10 h-10 border-2 border-primary">
                                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkJ0VuH4WKeuQt0pcUHgLXRUkZJ0187rM3yBvismgS6e5dmYpiJhHncpwZsJIDgB1Nv7jXsrujcbyufGy4nBqN-UfcEeYWQEmlwLSUCDmOk-fetcw4BPrAaRdkMSyJPBTvuodL0p4zuMWn9SPXRXWzj4HyNnldP19QIIdW_N7yl72ndNKZQKsdtTBvsDTbTg-x6IybtfsRvYD8QymWXSkhEgbcgKqBFii-7cQ7gF8Pe1zmquMg3ow7___8iLTYdTwqOyGbrsHH6w" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </div>
                    ) : (
                        <>
                            <Button 
                                variant="ghost" 
                                onClick={() => auth.signinRedirect()}
                                className="font-bold text-slate-600 hover:text-primary transition-colors"
                            >
                                Log In
                            </Button>
                            <Button 
                                onClick={() => auth.signinRedirect()}
                                className="font-bold kinetic-gradient text-white rounded-full px-6 shadow-lg"
                            >
                                Get Started
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
