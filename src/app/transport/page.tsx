
"use client"

import { useState, useEffect } from 'react';
import { ArrowLeft, Bus, MapPin, Clock, Navigation, Accessibility, Wind, Wifi, Info, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';

const approachingBuses = [
  { 
    id: 1, 
    hat: "9", 
    destination: "SDÜ Batı Yerleşkesi", 
    time: "3 dk sonra", 
    isFull: false, 
    features: { disabled: true, ac: true, wifi: true } 
  },
  { 
    id: 2, 
    hat: "14", 
    destination: "Çünür Yeni Mahalle", 
    time: "8 dk sonra", 
    isFull: true, 
    features: { disabled: true, ac: true, wifi: false } 
  },
  { 
    id: 3, 
    hat: "4", 
    destination: "Işıkkent Sosyal Tesisler", 
    time: "12 dk sonra", 
    isFull: false, 
    features: { disabled: true, ac: true, wifi: true } 
  },
];

export default function TransportPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF9]">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Canlı Ulaşım Rehberi</h1>
      </header>

      <main className="animate-fade-in">
        {/* Simulated Map View */}
        <section className="h-[40vh] relative bg-[#E5E7EB] overflow-hidden">
          {/* Mock Map Elements */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
          
          {/* Map Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 pointer-events-none">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-black/5" />
            ))}
          </div>

          {/* User Location Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />
            </div>
          </div>

          {/* Bus Markers (Simulated) */}
          <div className="absolute top-[30%] left-[20%] animate-bounce">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md mb-1">9</div>
              <Bus className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div className="absolute top-[60%] left-[70%]">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md mb-1">14</div>
              <Bus className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button className="p-3 bg-white rounded-xl shadow-lg text-primary border border-border/50">
              <Navigation className="h-5 w-5" />
            </button>
            <button className="p-3 bg-white rounded-xl shadow-lg text-primary border border-border/50">
              <MapPin className="h-5 w-5" />
            </button>
          </div>

          {/* Search Bar on Map */}
          <div className="absolute top-6 left-6 right-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input 
                placeholder="Durak veya hat ara..." 
                className="pl-10 h-12 bg-white/90 backdrop-blur-md border-none shadow-xl rounded-2xl focus-visible:ring-primary/20"
              />
            </div>
          </div>
        </section>

        {/* Stop Information & Approaches */}
        <section className="px-6 -mt-8 relative z-30">
          <Card className="border-none shadow-soft rounded-3xl bg-white mb-6">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg leading-tight">Valilik Durağı</h2>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Merkez, Isparta</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 py-1">
                  12 Hat Geçiyor
                </Badge>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Clock className="h-3 w-3" /> Yaklaşan Otobüsler
                </h3>
                
                <div className="space-y-3">
                  {approachingBuses.map((bus) => (
                    <div key={bus.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#FDFBF9] border border-border/50 group active:scale-[0.98] transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                          {bus.hat}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{bus.destination}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-bold text-accent uppercase">{bus.time}</span>
                            <div className="flex items-center gap-1.5 opacity-40">
                              {bus.features.disabled && <Accessibility className="h-3 w-3" />}
                              {bus.features.ac && <Wind className="h-3 w-3" />}
                              {bus.features.wifi && <Wifi className="h-3 w-3" />}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info Box */}
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
              <Info className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-primary">Bilgilendirme</p>
              <p className="text-[10px] text-primary/70 leading-relaxed font-medium">
                Otobüslerin konum verileri her 15 saniyede bir güncellenmektedir. Trafik yoğunluğuna göre varış süreleri değişkenlik gösterebilir.
              </p>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
