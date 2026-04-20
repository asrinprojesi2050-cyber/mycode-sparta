
"use client"

import { useState, useEffect } from 'react';
import { ArrowLeft, Car, MapPin, Navigation, Info, RefreshCw, X, ChevronUp, ChevronDown, CheckCircle2, Navigation2, Flag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';

const parkingLots = [
  { id: 1, name: "Merkez Belediye Otoparkı", total: 500, current: 420, price: "15₺ / saat", distance: "0.4 km" },
  { id: 2, name: "Iyaşpark Yan Otopark", total: 350, current: 80, price: "Ücretsiz", distance: "1.2 km" },
  { id: 3, name: "Hızırbey Çok Katlı", total: 200, current: 185, price: "10₺ / saat", distance: "2.1 km" },
  { id: 4, name: "Çünür Akıllı Otopark", total: 400, current: 45, price: "20₺ / saat", distance: "4.5 km" },
];

const floors = [
  { id: 'zemin', label: 'Zemin Kat' },
  { id: '-1', label: '-1. Kat' },
  { id: '-2', label: '-2. Kat' },
];

export default function ParkingPage() {
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedLot, setSelectedLot] = useState<any>(null);
  const [selectedFloor, setSelectedFloor] = useState('zemin');

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const startNavigation = (lot: any) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(100);
    }
    setSelectedLot(lot);
    setIsNavigating(true);
  };

  // Mock slots for the grid
  const slots = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    status: i === 21 ? 'target' : Math.random() > 0.4 ? 'occupied' : 'free', // P-22 is target
    label: `P-${i + 1}`
  }));

  if (isNavigating && selectedLot) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#FDFBF9] animate-in fade-in duration-500 flex flex-col overflow-hidden">
        {/* Nav Header */}
        <header className="px-6 pt-12 pb-6 bg-white border-b border-border/50 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Navigation2 className="h-6 w-6" />
             </div>
             <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Otopark İçi Navigasyon</p>
                <h2 className="text-lg font-black text-foreground">{selectedLot.name}</h2>
             </div>
          </div>
          <button 
            onClick={() => setIsNavigating(false)}
            className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground active:scale-90 transition-transform"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Floor Selection Tab */}
        <div className="px-6 py-4 bg-white/50 backdrop-blur-md flex gap-2 overflow-x-auto scrollbar-hide border-b border-border/30">
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => setSelectedFloor(floor.id)}
              className={cn(
                "whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                selectedFloor === floor.id 
                  ? "bg-primary text-white shadow-lg" 
                  : "bg-white text-muted-foreground border border-border"
              )}
            >
              {floor.label}
            </button>
          ))}
        </div>

        {/* Kroki Grid Area */}
        <div className="flex-1 overflow-auto p-8 relative bg-[#FDFBF9]">
          <div className="max-w-md mx-auto relative">
             <div className="grid grid-cols-4 gap-4 p-6 bg-white rounded-[2.5rem] shadow-soft border border-border/40">
                {slots.map((slot) => (
                  <div 
                    key={slot.id}
                    className={cn(
                      "aspect-[3/4] rounded-lg border-2 flex flex-col items-center justify-center relative overflow-hidden transition-all",
                      slot.status === 'target' 
                        ? "border-accent bg-accent/10 animate-pulse ring-4 ring-accent/20"
                        : slot.status === 'occupied'
                          ? "border-[#8D3B4A]/20 bg-[#8D3B4A]/5 opacity-60"
                          : "border-green-200 bg-green-50"
                    )}
                  >
                    {slot.status === 'occupied' && (
                       <Car className="h-4 w-4 text-[#8D3B4A]/30 mb-1" />
                    )}
                    {slot.status === 'target' && (
                       <Flag className="h-5 w-5 text-accent animate-bounce mb-1" />
                    )}
                    <span className={cn(
                      "text-[9px] font-black",
                      slot.status === 'target' ? "text-accent" : "text-muted-foreground/50"
                    )}>
                      {slot.label}
                    </span>
                  </div>
                ))}

                {/* Simulated Moving User Icon */}
                <div className="absolute top-[20%] left-[45%] animate-[park-move_15s_linear_infinite] pointer-events-none z-50">
                   <div className="relative">
                      <div className="w-10 h-10 bg-blue-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center -rotate-45">
                         <Navigation2 className="h-5 w-5 text-white fill-white" />
                      </div>
                      <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
                   </div>
                </div>
             </div>

             {/* Road Labels */}
             <div className="mt-8 flex justify-center">
                <div className="px-6 py-2 bg-secondary/30 rounded-full border border-border text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  GİRİŞ YOLU
                </div>
             </div>
          </div>
        </div>

        {/* Target Info Panel */}
        <div className="bg-white p-8 pb-12 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(141,59,74,0.1)] border-t border-border/50">
          <div className="flex items-center justify-between gap-6">
             <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                   <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Hedef Peron</p>
                </div>
                <h3 className="text-2xl font-black text-foreground">P-22 Peronu</h3>
                <p className="text-xs font-medium text-muted-foreground">Navigasyon sizi en uygun boş yere yönlendiriyor.</p>
             </div>
             <Button className="h-16 w-16 rounded-[2rem] bg-accent hover:bg-accent/90 shadow-xl shadow-accent/20 flex items-center justify-center group transition-all">
                <CheckCircle2 className="h-8 w-8 text-white group-hover:scale-110" />
             </Button>
          </div>
        </div>

        <style jsx>{`
          @keyframes park-move {
            0% { transform: translate(0, 0) rotate(180deg); }
            20% { transform: translate(0, 100px) rotate(180deg); }
            30% { transform: translate(0, 100px) rotate(90deg); }
            50% { transform: translate(-100px, 100px) rotate(90deg); }
            60% { transform: translate(-100px, 100px) rotate(180deg); }
            100% { transform: translate(-100px, 350px) rotate(180deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft">
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Link>
          <h1 className="text-xl font-bold text-primary">Otopark Doluluk</h1>
        </div>
        <button 
          onClick={refreshData} 
          className={cn("p-2 text-primary transition-all", loading && "animate-spin")}
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-6">
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary shrink-0" />
          <p className="text-xs text-primary/80 leading-relaxed">
            Isparta genelindeki akıllı otoparkların doluluk oranlarını gerçek zamanlı olarak buradan takip edebilirsiniz.
          </p>
        </div>

        <div className="space-y-4">
          {parkingLots.map((lot) => {
            const percentage = Math.round((lot.current / lot.total) * 100);
            const isFull = percentage > 90;
            const isMedium = percentage > 60 && percentage <= 90;

            return (
              <Card key={lot.id} className="border-none shadow-soft rounded-xl overflow-hidden bg-white">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-1">{lot.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                          <MapPin className="h-3 w-3" /> {lot.distance}
                        </span>
                        <span className="text-[10px] font-bold text-accent">
                          {lot.price}
                        </span>
                      </div>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold",
                      isFull ? "bg-red-100 text-red-600" : isMedium ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"
                    )}>
                      {isFull ? "Dolu" : isMedium ? "Yoğun" : "Müsait"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Doluluk Oranı</span>
                      <span>%{percentage}</span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                      style={{ 
                        "--tw-bg-opacity": "1",
                        "backgroundColor": "hsl(var(--secondary))"
                      } as any}
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground pt-1">
                      <span>Boş Alan: {lot.total - lot.current}</span>
                      <span>Toplam Kapasite: {lot.total}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => startNavigation(lot)}
                    className="w-full mt-5 h-10 rounded-xl bg-primary hover:bg-primary/90 gap-2 text-xs"
                  >
                    <Navigation className="h-3 w-3" /> Navigasyona Başla
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
