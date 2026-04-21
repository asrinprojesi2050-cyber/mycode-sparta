
"use client"

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bus, MapPin, Navigation, 
  Wifi, Info, Loader2, Search,
  ChevronRight, Bell, BellRing, QrCode, Sparkles, Map as MapIcon
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  const [searchQuery, setSearchQuery] = useState("");
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
    const interval = setInterval(fetchBusData, 15000);
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
        title: "🔔 Bildirim Açık",
        description: `${bus.hat} numaralı araç durağa yaklaştığında uyarılacaksınız!`,
      });
    }
    setNotifiedBuses(newNotified);
  };

  return (
    <div className="pb-32 min-h-screen bg-[#FDFBF9]">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-border/10">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Seyahat Rehberi</h1>
      </header>

      <main className="px-6 pt-6 space-y-8 animate-fade-in max-w-md mx-auto">
        
        {/* Rota Planlayıcı Bölümü */}
        <section className="space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Nereye gitmek istersiniz?" 
              className="h-14 pl-12 rounded-2xl bg-white border-none shadow-soft text-sm font-bold placeholder:text-muted-foreground/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Card className="border-none shadow-soft rounded-2xl overflow-hidden bg-white h-40 relative group cursor-pointer active:scale-[0.99] transition-transform">
            <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 opacity-40">
                <MapIcon className="h-10 w-10 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Canlı Haritayı Görüntüle</span>
              </div>
            </div>
            {/* Harita Placeholder Deseni */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #8D3B4A 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </Card>
        </section>

        {/* Canlı Takip Bölümü */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Yakındaki Hatlar</h3>
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleNotification(bus);
                              }}
                              className={cn(
                                "ml-auto w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                isNotified 
                                  ? "bg-primary/10 text-primary shadow-inner scale-105" 
                                  : "text-muted-foreground/40 hover:text-primary/60 hover:bg-primary/5"
                              )}
                            >
                              {isNotified ? (
                                <BellRing className="h-5 w-5 fill-primary animate-bounce" />
                              ) : (
                                <Bell className="h-5 w-5" />
                              )}
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

        {/* Bilgi Kutusu */}
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-primary">Akıllı Takip Asistanı</p>
            <p className="text-[10px] text-primary/70 leading-relaxed font-medium uppercase">
              Seçtiğiniz hat durağa yaklaşınca anlık bildirim alacaksınız. Rota planlayıcı ile şehrin her noktasına en hızlı ulaşımı keşfedin.
            </p>
          </div>
        </div>

        {/* Hızlı Erişim QR */}
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
