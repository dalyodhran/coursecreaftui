import React from "react";
import type { DashboardData } from "@/models/dashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TodaysProtocolCardProps {
  protocol: DashboardData["todaysProtocol"];
}

export const TodaysProtocolCard: React.FC<TodaysProtocolCardProps> = ({
  protocol,
}) => {
  return (
    <Card className="bg-[linear-gradient(135deg,#1978E5_0%,#1256A5_100%)] p-10 rounded-xl shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04),0_2px_8px_-1px_rgba(0,0,0,0.02)] text-white relative overflow-hidden border-none">
      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="font-label text-[10px] uppercase tracking-[0.2em] font-black bg-white/20 px-3 py-1.5 rounded-md">
            Today's Protocol
          </span>
          <h3 className="font-headline text-3xl font-black mt-6 leading-tight">
            {protocol.title}
          </h3>
          <p className="text-white/80 mt-2 text-sm">{protocol.details}</p>
        </div>
        <span className="material-symbols-outlined text-5xl">play_circle</span>
      </div>
      <div className="mt-10 flex gap-10 relative z-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
            Duration
          </p>
          <p className="font-headline text-2xl font-black mt-1">
            {protocol.duration}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
            Intensity
          </p>
          <p className="font-headline text-2xl font-black mt-1">
            {protocol.intensity}
          </p>
        </div>
      </div>
      <Button className="w-full mt-10 bg-white text-primary py-5 rounded-xl font-headline text-xs font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all shadow-lg active:scale-95 h-auto">
        Sync to Watch
      </Button>
    </Card>
  );
};
