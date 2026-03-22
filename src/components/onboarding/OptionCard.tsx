import React from 'react';
import { Card } from "@/components/ui/card";
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface StepOption {
    id: string;
    label: string;
    sub?: string;
    icon?: React.ElementType | null;
}

interface OptionCardProps {
    option: StepOption;
    selected: string | string[] | boolean | null;
    onClick: (id: string) => void;
    type: 'single' | 'multi' | 'form' | 'profile';
    className?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({ 
    option, 
    selected, 
    onClick, 
    type,
    className 
}) => {
    const isSelected = type === 'multi'
        ? Array.isArray(selected) && selected.includes(option.id)
        : selected === option.id;

    const Icon = option.icon;

    return (
        <Card
            role="button"
            onClick={() => onClick(option.id)}
            className={cn(
                "group relative w-full text-left p-6 cursor-pointer border transition-all duration-200 flex items-center gap-4 outline-none",
                isSelected
                    ? "bg-primary/5 border-primary shadow-[0px_8px_16px_rgba(0,90,180,0.06)] -translate-y-0.5"
                    : "bg-surface-container-lowest border-outline-variant/20 hover:border-outline-variant/40 hover:bg-surface-container-low hover:shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-0.5",
                className
            )}
        >
            {/* Icon Wrapper */}
            {Icon && (
                <div className={cn(
                    "p-3 rounded-xl transition-colors",
                    isSelected ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant group-hover:text-on-surface group-hover:bg-surface-container-high"
                )}>
                    <Icon size={24} />
                </div>
            )}

            {/* Text Content */}
            <div className="flex-1">
                <h3 className={cn(
                    "font-black tracking-tight text-lg",
                    isSelected ? "text-primary" : "text-on-surface"
                )}>
                    {option.label}
                </h3>
                {option.sub && (
                    <p className="text-sm text-on-surface-variant mt-1 font-medium">{option.sub}</p>
                )}
            </div>

            {/* Selection Indicator */}
            <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-outline-variant/30 group-hover:border-outline-variant/50"
            )}>
                {isSelected && <Check size={14} strokeWidth={4} />}
            </div>
        </Card>
    );
};
