
"use client"

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bus, MapPin, Navigation, 
  Accessibility, Wind, Wifi, Info, 
  ChevronRight, Bell, BellRing, Sparkles, QrCode
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const approachingBuses = [
  { 
    id: 1, 
    hat: "22", 
    destination: "Işıkkent / SDÜ Batı Yerleşkesi", 
    status: "Yaklaşıyor (2 Durak Kaldı)",
    time: "4 Dakika", 
    isFull: false, 
    features: { disabled: true, ac: true, wifi: true } 
  },
  { 
    id: 2, 
    hat: "9", 
    destination: "Çünür Yeni Mahalle", 
    status: "Yolda",
    time: "12 Dakika", 
    isFull: true, 
    features: { disabled: true, ac: true, wifi: false } 
  },
  { 
    id: 3, 
    hat: "18", 
    destination: "SDÜ Batı Kampüsü", 
    status: "Yolda",
    time: "20 Dakika", 
    isFull: false, 
    features: { disabled: true, ac: true, wifi: true } 
  },
];

export default function TransportPage() {
  const [loading, setLoading] = useState(true);
  const [notifiedBuses, setNotifiedBuses] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleNotification = (bus: typeof approachingBuses[0]) => {
    const newNotified = new Set(notifiedBuses);
    if (newNotified.has(bus.id)) {
      newNotified.delete(bus.id);
      toast({
        title: "Takip İptal",
        description: `${bus.hat} hattı takibi durduruldu.`,
      });
    } else {
      newNotified.add(bus.id);
      toast({
        title: "Akıllı Takip Aktif",
        description: `${bus.hat} yaklaştığında size haber vereceğiz.`,
      });
    }
    setNotifiedBuses(newNotified);
  };

  const RoseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
      <path d="M12 22s-1-4-1-5 2-4 2-4" />
      <path d="M12 13c-1-1-4-2-4-4s1-3 2-3 2 1 2 3" />
      <path d="M12 13c1-1 4-2 4-4s-1-3-2-3-2 1-2 3" />
      <path d="M12 13v-4" />
      <circle cx="12" cy="7" r="3" />
    </svg>
  );

  return (
    <div className="pb-32 min-h-screen bg-[#FDFBF9]">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-border/10">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Seyahat Rehberi</h1>
      </header>

      <main className="px-6 pt-6 space-y-8 animate-fade-in max-w-md mx-auto">
        
        {/* Section 1: Virtual Isparta Kart */}
        <section>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-[1.75rem] blur opacity-20"></div>
            <Card className="relative border-none bg-gradient-to-br from-[#8D3B4A] via-[#A64459] to-[#8D3B4A] text-white rounded-[1.5rem] overflow-hidden shadow-xl aspect-[1.6/1] flex flex-col justify-between p-6">
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <RoseIcon />
                    <span className="font-bold text-[10px] tracking-tight uppercase">Isparta Kart</span>
                  </div>
                  <p className="text-[8px] text-white/60 uppercase tracking-[0.2em] font-medium">Sanal Ulaşım Kartı</p>
                </div>
                <Wifi className="h-4 w-4 text-white/70 rotate-90" />
              </div>
              <div className="relative z-10">
                <p className="text-[9px] text-white/50 uppercase tracking-widest mb-0.5 font-bold">Güncel Bakiye</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tighter text-white">142.50</span>
                  <span className="text-lg font-medium opacity-80 text-white">₺</span>
                </div>
              </div>
              <div className="flex justify-between items-end relative z-10">
                <div className="space-y-0.5">
                  <p className="text-[9px] font-mono tracking-[0.2em] opacity-40">5432 **** **** 1234</p>
                  <p className="text-[8px] font-bold uppercase tracking-wider opacity-60">Vatandaş Kart</p>
                </div>
                <div className="h-6 w-9 bg-white/20 rounded-sm backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <div className="w-4 h-2.5 bg-gradient-to-r from-yellow-400/80 to-yellow-600/80 rounded-[1px]" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Section 2: Canlı Takip Modülü */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Canlı Takip: Otobüsüm Nerede?</h3>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 text-[9px] font-bold">
              <MapPin className="h-2 w-2 mr-1" /> Çarşı Merkez Durağı
            </Badge>
          </div>

          {/* 1. Canlı Harita Simülasyonu */}
          <Card className="h-44 relative bg-[#E5E7EB] rounded-[1.5rem] overflow-hidden border-none shadow-soft">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
            
            {/* Road Simulation */}
            <div className="absolute top-1/2 left-0 right-0 h-12 bg-white/40 -translate-y-1/2" />
            
            {/* User Stop Location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                   <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-lg" />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-black text-primary border border-primary/10 shadow-sm">
                  ÇARŞI MERKEZ
                </div>
              </div>
            </div>

            {/* Bus Icon Simulation (Line 22) */}
            <div className="absolute top-[45%] left-[25%] animate-bounce">
              <div className="flex flex-col items-center">
                <div className="bg-[#8D3B4A] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-md mb-0.5 relative">
                  22
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8D3B4A] rotate-45" />
                </div>
                <Bus className="h-5 w-5 text-[#8D3B4A]" />
              </div>
            </div>

            <div className="absolute bottom-4 right-4">
              <button className="p-2 bg-white/90 backdrop-blur-md rounded-lg shadow-md text-primary active:scale-95 transition-transform">
                <Navigation className="h-4 w-4" />
              </button>
            </div>
          </Card>

          {/* 2. Hat Bilgi Kartı (Focus Mode) */}
          <Card className="border-none shadow-2xl rounded-[2.25rem] bg-white overflow-hidden relative group transition-all active:scale-[0.99]">
             <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
             <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#8D3B4A] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
                         {approachingBuses[0].hat}
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Sıradaki Hat</p>
                         <h4 className="font-bold text-base leading-tight text-foreground">{approachingBuses[0].destination}</h4>
                      </div>
                   </div>
                   <button 
                     onClick={() => handleToggleNotification(approachingBuses[0])}
                     className={cn(
                       "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                       notifiedBuses.has(approachingBuses[0].id) ? "bg-primary text-white shadow-lg" : "bg-primary/5 text-primary/40 hover:text-primary"
                     )}
                   >
                     {notifiedBuses.has(approachingBuses[0].id) ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                   </button>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                   <div className="space-y-0.5">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Durum</p>
                      <p className="text-xs font-bold text-accent">{approachingBuses[0].status}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Tahmini Süre</p>
                      <p className="text-3xl font-black text-[#8D3B4A] tracking-tighter">{approachingBuses[0].time}</p>
                   </div>
                </div>
             </CardContent>
          </Card>
        </section>

        {/* 3. Diğer Yaklaşanlar Listesi */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Bu Duraktan Geçecek Diğer Hatlar</h3>
          
          <div className="space-y-2">
            {approachingBuses.slice(1).map((bus) => {
              const isNotified = notifiedBuses.has(bus.id);
              return (
                <Card key={bus.id} className="border-none shadow-soft rounded-2xl bg-white overflow-hidden active:scale-[0.99] transition-transform">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary/50 text-[#8D3B4A] rounded-xl flex items-center justify-center font-black text-base">
                        {bus.hat}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground/80">{bus.destination}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{bus.time}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleToggleNotification(bus)}
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                        isNotified ? "bg-primary text-white shadow-sm" : "bg-primary/5 text-primary/40 hover:text-primary"
                      )}
                    >
                      {isNotified ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Info Box */}
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-primary">Akıllı Hatırlatıcı</p>
            <p className="text-[10px] text-primary/70 leading-relaxed font-medium uppercase">
              Zil simgesine dokunarak otobüsün durağa gelmesine 2 dakika kala anlık bildirim alabilirsin.
            </p>
          </div>
        </div>

        {/* QR Button Quick Access */}
        <Button onClick={() => window.location.href='/isparta-kart'} className="w-full h-16 rounded-[2rem] bg-white border border-accent/20 text-accent hover:bg-accent/5 shadow-soft flex items-center justify-center gap-3 transition-all active:scale-95 group mb-8">
           <QrCode className="h-6 w-6 group-hover:rotate-12 transition-transform" />
           <span className="font-black text-base">QR ile Hızlı Biniş</span>
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
