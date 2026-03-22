import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from 'lucide-react';
import { useUploadAthleteAvatar } from '../../queries/useUploadAthleteAvatar';
import type { Athlete } from '../../models/athlete';
import type { OnboardingData } from '../../pages/OnboardWizardPage';

interface ProfileStepFormProps {
    athlete: Athlete | null;
    values: OnboardingData;
    onChange: (field: string, value: string) => void;
}

export const ProfileStepForm: React.FC<ProfileStepFormProps> = ({ athlete, values, onChange }) => {
    const [preview, setPreview] = useState<string | null>(values.avatar);
    const [isUploading, setIsUploading] = useState(false);

    const uploadAthleteAvatarMutation = useUploadAthleteAvatar();

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // 1. Show immediate local preview
            const localUrl = URL.createObjectURL(file);
            setPreview(localUrl);

            // 2. Start Upload Logic
            setIsUploading(true);

            try {
                const avatarUrl = await uploadAthleteAvatarMutation.mutateAsync({
                    athleteId: athlete?.id ?? '',
                    file: file,
                });

                onChange('avatar', avatarUrl);
            } catch (error) {
                console.error("Upload failed", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto animate-in fade-in zoom-in duration-500 font-['Lexend']">
            {/* Avatar Upload Circle */}
            <div className="relative mb-8 group cursor-pointer">
                <Avatar className="w-32 h-32 border-4 border-surface shadow-[0px_8px_16px_rgba(0,0,0,0.06)] group-hover:border-primary group-hover:shadow-[0px_12px_24px_rgba(0,90,180,0.1)] transition-all">
                    <AvatarImage src={preview || ''} className="object-cover" />
                    <AvatarFallback className="bg-surface-container-lowest">
                        <User size={48} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                    </AvatarFallback>
                </Avatar>

                {/* Camera Icon Badge */}
                <div className="absolute bottom-0 right-0 p-2 bg-surface-container-lowest rounded-full border-4 border-surface text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                    <Camera size={16} />
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                />
            </div>

            {/* Name Input */}
            <div className="w-full space-y-2">
                <Label htmlFor="displayName" className="text-sm font-bold tracking-widest uppercase text-on-surface-variant ml-1">
                    Display Name
                </Label>
                <Input
                    id="displayName"
                    type="text"
                    value={values.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    placeholder="e.g. Alex Runner"
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 text-on-surface text-lg text-center placeholder:text-outline-variant focus-visible:ring-primary/20 transition-all shadow-sm"
                    autoFocus
                />
            </div>
        </div>
    );
};
