import React from 'react';
import { 
    Bell, 
    Search, 
    LogOut 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from 'react-oidc-context';

interface TopBarProps {
    athleteName: string;
    athleteAvatar?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ athleteName, athleteAvatar }) => {
    const auth = useAuth();

    const handleLogout = () => {
        const provider = import.meta.env.VITE_AUTH_PROVIDER;

        if (provider === 'cognito') {
            auth.signoutRedirect({
                extraQueryParams: {
                    client_id: import.meta.env.VITE_CLIENT_ID,
                    logout_uri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
                },
            });
        } else {
            auth.signoutRedirect();
        }
    };

    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4 text-slate-400">
                <Search className="w-5 h-5" />
                <span className="text-sm font-medium">Search training data, blocks, or sessions...</span>
            </div>

            <div className="flex items-center gap-6">
                <Button variant="ghost" size="icon" className="relative text-slate-500 rounded-sm">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </Button>

                <div className="h-8 w-px bg-slate-200" />

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-black tracking-tight text-slate-900 leading-none">{athleteName}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mt-1">Pro Athlete</p>
                    </div>
                    <Avatar className="h-10 w-10 border rounded-sm">
                        <AvatarImage src={athleteAvatar} />
                        <AvatarFallback className="rounded-sm bg-blue-100 text-blue-700 font-bold">
                            {athleteName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-400 hover:text-red-500 rounded-sm">
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
};
