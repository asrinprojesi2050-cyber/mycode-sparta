
"use client"

import { useState, useEffect } from 'react';
import { ArrowLeft, Car, MapPin, Navigation, Info, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/bottom-nav';

const parkingLots = [
  { id: 1, name: "Merkez Belediye Otoparkı", total: 500, current: 420, price: "15₺ / saat", distance: "0.4 km" },
  { id: 2, name: "Iyaşpark Yan Otopark", total: 350, current: 80, price: "Ücretsiz", distance: "1.2 km" },
  { id: 3, name: "Hızırbey Çok Katlı", total: 200, current: 185, price: "10₺ / saat", distance: "2.1 km" },
  { id: 4, name: "Çünür Akıllı Otopark", total: 400, current: 45, price: "20₺ / saat", distance: "4.5 km" },
];

export default function ParkingPage() {
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
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

                  <Button className="w-full mt-5 h-10 rounded-xl bg-primary hover:bg-primary/90 gap-2 text-xs">
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
