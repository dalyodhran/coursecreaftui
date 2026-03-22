import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
    current: number;
    total: number;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className }) => {
    const progress = ((current + 1) / total) * 100;
    
    return (
        <div className={className}>
            <Progress value={progress} className="h-1.5" />
        </div>
    );
};
