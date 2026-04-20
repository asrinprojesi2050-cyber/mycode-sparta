
"use client"

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bus, MapPin, Clock, Navigation, 
  Accessibility, Wind, Wifi, Info, Search, 
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
    hat: "18", 
    destination: "SDÜ Batı Kampüsü", 
    time: "3 dk sonra", 
    isFull: false, 
    features: { disabled: true, ac: true, wifi: true } 
  },
  { 
    id: 2, 
    hat: "9", 
    destination: "Çünür Yeni Mahalle", 
    time: "7 dk sonra", 
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
  const [notifiedBuses, setNotifiedBuses] = useState<Set<number>>(new Set());
  const [activeNotification, setActiveNotification] = useState<typeof approachingBuses[0] | null>(null);
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
      // Simulate arrival notification after 5 seconds for demo
      setTimeout(() => {
        setActiveNotification(bus);
      }, 5000);
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
    <div className="pb-32 min-h-screen bg-[#FDFBF9] overflow-x-hidden">
      {/* Apple Style Arrival Alert */}
      {activeNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-sm animate-in slide-in-from-top-full duration-500 ease-out">
          <Card className="bg-white border-none shadow-2xl rounded-2xl overflow-hidden ring-1 ring-primary/10">
            <CardContent className="p-5 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Sparkles className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-primary font-bold text-lg leading-tight">Otobüsün Yaklaşıyor!</h4>
                <p className="text-xs font-medium text-muted-foreground mt-1">
                  {activeNotification.hat} Numaralı Hat şu an 1 durak mesafede. Durakta olmaya hazır mısın?
                </p>
              </div>
              <Button 
                onClick={() => setActiveNotification(null)}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-bold h-11"
              >
                Tamam, Hazırım
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Seyahat Rehberi</h1>
      </header>

      <main className="px-6 pt-6 space-y-8 animate-fade-in">
        
        {/* Section 1: Digital Isparta Kart */}
        <section className="space-y-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-[1.75rem] blur opacity-20"></div>
            <Card className="relative border-none bg-gradient-to-br from-[#8D3B4A] via-[#A64459] to-[#8D3B4A] text-white rounded-[1.5rem] overflow-hidden shadow-xl aspect-[1.6/1] flex flex-col justify-between p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <RoseIcon />
                    <span className="font-bold text-xs tracking-tight uppercase">Isparta Kart</span>
                  </div>
                  <p className="text-[9px] text-white/50 uppercase tracking-[0.2em]">Premium Vatandaş</p>
                </div>
                <Wifi className="h-5 w-5 text-white/60 rotate-90" />
              </div>

              <div>
                <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Güncel Bakiye</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tighter">142.50</span>
                  <span className="text-lg font-medium opacity-80">₺</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <p className="text-[10px] font-mono tracking-widest opacity-40">**** **** **** 1234</p>
                <div className="h-7 w-11 bg-white/20 rounded-md backdrop-blur-sm border border-white/10" />
              </div>
            </Card>
          </div>

          <button className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative w-full h-16 rounded-2xl bg-white border border-accent/20 flex items-center justify-between px-6 shadow-soft overflow-hidden active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                  <QrCode className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-accent tracking-tight">QR Kod ile Otobüse Bin</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-accent/50 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </section>

        {/* Section 2: Live Map Simulation */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
             <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Canlı Harita</h3>
             <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 text-[9px] font-bold">
               <MapPin className="h-2 w-2 mr-1" /> Çarşı Merkez Durağı
             </Badge>
          </div>
          <Card className="h-44 relative bg-[#E5E7EB] rounded-[1.5rem] overflow-hidden border-none shadow-soft">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
            
            {/* Simulation of road */}
            <div className="absolute top-1/2 left-0 right-0 h-12 bg-white/40 -translate-y-1/2" />
            
            {/* User Location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                <div className="absolute -inset-3 bg-blue-500/20 rounded-full animate-ping" />
              </div>
            </div>

            {/* Bus 1 Simulation */}
            <div className="absolute top-[45%] left-[25%] animate-bounce">
              <div className="flex flex-col items-center">
                <div className="bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-md mb-0.5">18</div>
                <Bus className="h-5 w-5 text-primary" />
              </div>
            </div>

            {/* Bus 2 Simulation */}
            <div className="absolute top-[52%] left-[75%]">
              <div className="flex flex-col items-center">
                <div className="bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-md mb-0.5">9</div>
                <Bus className="h-5 w-5 text-primary" />
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="p-2 bg-white/90 backdrop-blur-md rounded-lg shadow-md text-primary">
                <Navigation className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </section>

        {/* Section 3: Approaching Buses & Smart Notification */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bu Durağa Yaklaşanlar</h3>
          
          <div className="space-y-3">
            {approachingBuses.map((bus) => {
              const isNotified = notifiedBuses.has(bus.id);
              return (
                <Card key={bus.id} className="border-none shadow-soft rounded-2xl bg-white overflow-hidden active:scale-[0.99] transition-transform">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#8D3B4A] text-white rounded-xl flex items-center justify-center font-black text-lg shadow-md">
                        {bus.hat}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground/90">{bus.destination}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-bold text-accent uppercase tracking-tighter">{bus.time}</span>
                          <div className="flex items-center gap-1 opacity-30">
                            {bus.features.disabled && <Accessibility className="h-2.5 w-2.5" />}
                            {bus.features.ac && <Wind className="h-2.5 w-2.5" />}
                            {bus.features.wifi && <Wifi className="h-2.5 w-2.5" />}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleToggleNotification(bus)}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        isNotified ? "bg-primary text-white shadow-lg" : "bg-primary/5 text-primary/40 hover:text-primary"
                      )}
                    >
                      {isNotified ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Bottom Info Box */}
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-primary">Akıllı Takip</p>
            <p className="text-[10px] text-primary/70 leading-relaxed font-medium">
              Zil simgesine tıklayarak otobüsün durağa gelmesine 2 dakika kala bildirim alabilirsin.
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
