"use client"

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bus, MapPin, Navigation, 
  Wifi, Info, Loader2,
  ChevronRight, Bell, BellRing, QrCode, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BusInfo {
  id: number;
  hat: string;
  guzergah: string;
  durak: string;
  kalanDakika: number;
  durum: string;
}

export default function TransportPage() {
  const [loading, setLoading] = useState(true);
  const [buses, setBuses] = useState<BusInfo[]>([]);
  const [notifiedBuses, setNotifiedBuses] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const fetchBusData = async () => {
    try {
      const response = await fetch('/api/ulasim');
      const data = await response.json();
      setBuses(data);
    } catch (error) {
      console.error('Ulaşım verileri çekilemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusData();
    const interval = setInterval(fetchBusData, 15000); // 15 saniyede bir güncelle
    return () => clearInterval(interval);
  }, []);

  const handleToggleNotification = (bus: BusInfo) => {
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
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-border/10">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Seyahat Rehberi</h1>
      </header>

      <main className="px-6 pt-6 space-y-8 animate-fade-in max-w-md mx-auto">
        
        {/* Isparta Kart Visualization */}
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
                  <span className="text-3xl font-bold tracking-tighter">142.50</span>
                  <span className="text-lg font-medium opacity-80">₺</span>
                </div>
              </div>
              <div className="flex justify-between items-end relative z-10">
                <p className="text-[9px] font-mono tracking-[0.2em] opacity-40">5432 **** **** 1234</p>
                <div className="h-6 w-9 bg-white/20 rounded-sm backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <div className="w-4 h-2.5 bg-yellow-500/80 rounded-[1px]" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Canlı Takip Bölümü */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Hat Takibi</h3>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 text-[9px] font-bold">
              <MapPin className="h-2 w-2 mr-1" /> Güncel Durak: Iyaşpark
            </Badge>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-xs font-bold text-muted-foreground">Durak bilgileri taranıyor...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {buses.map((bus) => {
                const isApproaching = bus.kalanDakika <= 5;
                const isNotified = notifiedBuses.has(bus.id);
                
                return (
                  <Card key={bus.id} className="border-none shadow-soft rounded-2xl bg-white overflow-hidden active:scale-[0.99] transition-transform relative group">
                    <CardContent className="p-0">
                      <div className="flex items-stretch min-h-[90px]">
                        {/* Hat No Kutusu */}
                        <div className="w-20 bg-[#8D3B4A] flex flex-col items-center justify-center text-white">
                          <span className="text-2xl font-black">{bus.hat}</span>
                          <span className="text-[8px] font-bold uppercase opacity-60">HAT NO</span>
                        </div>
                        
                        {/* Bilgiler */}
                        <div className="flex-1 p-4 flex flex-col justify-center">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-sm text-foreground">{bus.guzergah}</h4>
                              <p className="text-[10px] text-muted-foreground font-medium">{bus.durak}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">Kalan Süre</p>
                              <p className="text-xl font-black text-[#8D3B4A] tracking-tighter">{bus.kalanDakika} DK</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            {isApproaching && (
                              <div className="flex items-center gap-1 bg-[#8D3B4A]/10 text-[#8D3B4A] px-2 py-0.5 rounded-full animate-pulse">
                                <Sparkles className="h-2.5 w-2.5" />
                                <span className="text-[8px] font-black uppercase tracking-widest">Yaklaşıyor</span>
                              </div>
                            )}
                            <button 
                              onClick={() => handleToggleNotification(bus)}
                              className={cn(
                                "ml-auto w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                isNotified ? "bg-primary text-white shadow-md" : "bg-primary/5 text-primary/40 hover:text-primary"
                              )}
                            >
                              {isNotified ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Info Box */}
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-primary">Akıllı Hatırlatıcı</p>
            <p className="text-[10px] text-primary/70 leading-relaxed font-medium uppercase">
              Otobüsün durağa gelmesine 2 dakika kala anlık bildirim almak için zil simgesine dokunabilirsin.
            </p>
          </div>
        </div>

        {/* Quick Access QR */}
        <Button asChild variant="outline" className="w-full h-16 rounded-[2rem] border-accent/20 text-accent hover:bg-accent/5 shadow-soft flex items-center justify-center gap-3 transition-all active:scale-95 group mb-8">
          <Link href="/isparta-kart">
            <QrCode className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            <span className="font-black text-base">QR ile Hızlı Biniş</span>
          </Link>
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
