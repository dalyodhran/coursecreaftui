import React from 'react';
import { Button } from "@/components/ui/button";

export const CtaSection: React.FC = () => {
    return (
        <section className="py-24 px-8">
            <div className="max-w-5xl mx-auto bg-surface-container-low rounded-xl p-16 text-center border-2 border-primary/5">
                <h2 className="text-5xl font-black tracking-tighter mb-8">Ready to out-engineer the competition?</h2>
                <div className="max-w-2xl mx-auto mb-12">
                    <p className="text-xl text-on-surface-variant">Join 20,000+ athletes who have stopped guessing and started peaking with CourseCrafter's precision architecture.</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="px-12 py-8 rounded-full kinetic-gradient text-on-primary font-bold text-xl shadow-2xl hover:opacity-90">
                        Start Your 14-Day Trial
                    </Button>
                </div>
            </div>
        </section>
    );
};
