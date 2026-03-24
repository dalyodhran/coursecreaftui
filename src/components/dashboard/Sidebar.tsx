import React from 'react';
import { Button } from "@/components/ui/button";
import { 
    Home, 
    Calendar, 
    BarChart2, 
    User, 
    Settings, 
    Trophy,
    Layout
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface SidebarProps {
    className?: string;
}

const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Calendar, label: 'Training Plan', active: false },
    { icon: BarChart2, label: 'Analysis', active: false },
    { icon: Trophy, label: 'Races', active: false },
    { icon: User, label: 'Profile', active: false },
    { icon: Settings, label: 'Settings', active: false },
];

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    return (
        <aside className={cn("w-64 border-r bg-white h-screen flex flex-col", className)}>
            <div className="p-6">
                <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-blue-700">
                    <Layout className="w-8 h-8" />
                    <span>CourseCrafter</span>
                </div>
            </div>
            
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => (
                    <Button
                        key={item.label}
                        variant={item.active ? "secondary" : "ghost"}
                        className={cn(
                            "w-full justify-start gap-3 rounded-sm font-semibold",
                            item.active ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:text-blue-600 hover:bg-slate-50"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Button>
                ))}
            </nav>

            <div className="p-4 border-t">
                <div className="bg-slate-900 rounded-sm p-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Current Cycle</p>
                    <p className="text-sm font-black tracking-tight">Marathon Readiness</p>
                    <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[65%]" />
                    </div>
                </div>
            </div>
        </aside>
    );
};
