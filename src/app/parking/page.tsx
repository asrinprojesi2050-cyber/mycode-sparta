
"use client"

import { useState } from 'react';
import { ArrowLeft, Car, MapPin, Navigation, Info, RefreshCw, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';

const parkingLots = [
  { 
    id: 1, 
    name: "Merkez Belediye Otoparkı", 
    total: 500, 
    current: 420, 
    price: "15₺ / saat", 
    distance: "0.4 km",
    coords: "37.7648,30.5566",
    floors: [
      { label: "Zemin Kat", status: "12 Boş Yer", isFull: false },
      { label: "-1. Kat", status: "DOLU", isFull: true },
      { label: "-2. Kat", status: "45 Boş Yer", isFull: false },
    ],
    advice: "Şu an -2. Kat daha müsait, oraya yönlenebilirsiniz."
  },
  { 
    id: 2, 
    name: "Iyaşpark Yan Otopark", 
    total: 350, 
    current: 80, 
    price: "Ücretsiz", 
    distance: "1.2 km",
    coords: "37.7833,30.5500",
    floors: [
      { label: "Zemin Kat", status: "85 Boş Yer", isFull: false },
      { label: "-1. Kat", status: "120 Boş Yer", isFull: false },
    ],
    advice: "Tüm katlar müsait, rahatça park edebilirsiniz."
  },
  { 
    id: 3, 
    name: "Hızırbey Çok Katlı", 
    total: 200, 
    current: 185, 
    price: "10₺ / saat", 
    distance: "2.1 km",
    coords: "37.7600,30.5400",
    floors: [
      { label: "Zemin Kat", status: "DOLU", isFull: true },
      { label: "-1. Kat", status: "5 Boş Yer", isFull: false },
      { label: "-2. Kat", status: "10 Boş Yer", isFull: false },
    ],
    advice: "Giriş kat dolu, lütfen alt katlara ilerleyiniz."
  }
];

export default function ParkingPage() {
  const [loading, setLoading] = useState(false);
  const [selectedLot, setSelectedLot] = useState<typeof parkingLots[0] | null>(null);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const startExternalNavigation = (coords: string) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coords}`, '_blank');
  };

  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF9]">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-border/10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => selectedLot ? setSelectedLot(null) : window.history.back()} 
            className="p-2 bg-white rounded-xl shadow-soft"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </button>
          <h1 className="text-xl font-bold text-primary tracking-tight">
            {selectedLot ? "Otopark Detayı" : "Otopark Doluluk"}
          </h1>
        </div>
        {!selectedLot && (
          <button 
            onClick={refreshData} 
            className={cn("p-2 text-primary transition-all", loading && "animate-spin")}
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        )}
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-6 max-w-md mx-auto">
        {!selectedLot ? (
          <>
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <p className="text-xs text-primary/80 leading-relaxed font-medium">
                Isparta genelindeki akıllı otoparkların güncel durumlarını buradan takip edebilirsiniz.
              </p>
            </div>

            <div className="space-y-4">
              {parkingLots.map((lot) => (
                <Card 
                  key={lot.id} 
                  className="border-none shadow-soft rounded-2xl overflow-hidden bg-white cursor-pointer active:scale-[0.98] transition-all"
                  onClick={() => setSelectedLot(lot)}
                >
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                        <Car className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-0.5">{lot.name}</h4>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{lot.distance}</span>
                           <span className="text-[10px] font-black text-accent uppercase tracking-tight">{lot.price}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/30" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
            {/* Lot Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-foreground tracking-tight">{selectedLot.name}</h2>
              <div className="flex justify-center items-center gap-2 text-xs font-bold text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{selectedLot.distance} mesafe</span>
              </div>
            </div>

            {/* Floor Cards */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Kat Bazlı Durum</h3>
              {selectedLot.floors.map((floor, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "flex items-center justify-between p-5 rounded-2xl border transition-all",
                    floor.isFull 
                      ? "bg-primary/5 border-primary/20 text-primary" 
                      : "bg-white border-border/50 text-foreground shadow-sm"
                  )}
                >
                  <span className="text-sm font-bold uppercase tracking-wider">{floor.label}</span>
                  <span className={cn(
                    "text-xs font-black uppercase tracking-widest",
                    floor.isFull ? "text-primary" : "text-green-600"
                  )}>
                    {floor.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Advice Section */}
            <div className="bg-white p-6 rounded-3xl border-2 border-primary/10 shadow-soft relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
               <div className="flex items-center gap-3 mb-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Akıllı Yönlendirme</span>
               </div>
               <p className="text-sm font-bold text-foreground leading-relaxed">
                 {selectedLot.advice}
               </p>
            </div>

            {/* External Nav Button */}
            <Button 
              onClick={() => startExternalNavigation(selectedLot.coords)}
              className="w-full h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-base shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              <Navigation className="h-6 w-6" />
              Navigasyonu Başlat
            </Button>

            <p className="text-center text-[10px] text-muted-foreground font-medium uppercase tracking-[0.1em] px-8">
              Navigasyon sizi otoparkın ana giriş kapısına kadar yönlendirecektir.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
