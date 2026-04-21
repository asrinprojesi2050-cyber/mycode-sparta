
"use client"

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Car, MapPin, Navigation, Info, RefreshCw, 
  ChevronRight, Loader2, CalendarCheck, QrCode, X, CheckCircle2,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Reservation {
  lotId: number;
  lotName: string;
  floor: string;
  code: string;
  expiresAt: number;
}

export default function ParkingPage() {
  const [loading, setLoading] = useState(true);
  const [parkingLots, setParkingLots] = useState<any[] | null>(null);
  const [selectedLot, setSelectedLot] = useState<any | null>(null);
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/otopark');
      const data = await response.json();
      setParkingLots(data);
      
      if (selectedLot) {
        const updatedSelected = data.find((l: any) => l.id === selectedLot.id);
        if (updatedSelected) setSelectedLot(updatedSelected);
      }
    } catch (error) {
      console.error('Veri çekilemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [selectedLot?.id]);

  // Canlı Geri Sayım Sayacı
  useEffect(() => {
    if (!activeReservation) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = activeReservation.expiresAt - now;

      if (diff <= 0) {
        setActiveReservation(null);
        setTimeLeft("");
        toast({
          variant: "destructive",
          title: "Süre Doldu",
          description: "Randevunuz süresi dolduğu için otomatik olarak iptal edilmiştir.",
        });
        fetchData();
        return;
      }

      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeReservation]);

  const startExternalNavigation = (coords: string) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coords}`, '_blank');
  };

  const handleBooking = async (floorLabel: string) => {
    try {
      const response = await fetch('/api/otopark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedLot.id,
          floorLabel: floorLabel
        })
      });

      const result = await response.json();

      if (result.success) {
        const resCode = `PK-${Math.floor(1000 + Math.random() * 9000)}`;
        setActiveReservation({
          lotId: selectedLot.id,
          lotName: selectedLot.name,
          floor: floorLabel,
          code: resCode,
          expiresAt: result.expiresAt
        });
        
        toast({
          title: "Randevu Talebi Alındı",
          description: `${selectedLot.name} ${floorLabel} için yeriniz rezerve edildi.`,
        });
        fetchData();
      } else {
        toast({
          variant: "destructive",
          title: "Hata",
          description: result.message || "Randevu alınamadı.",
        });
      }
    } catch (error) {
      console.error('Randevu hatası:', error);
      toast({
        variant: "destructive",
        title: "Sistem Hatası",
        description: "Şu an randevu alınamıyor.",
      });
    }
  };

  const cancelReservation = () => {
    setActiveReservation(null);
    toast({
      description: "Randevunuz iptal edildi.",
    });
    fetchData(); // İptal sonrası verileri tazele
  };

  const getStatusInfo = (free: number, total: number) => {
    if (free <= 0) return { label: "DOLU", color: "bg-red-100 text-[#8D3B4A] border-red-200" };
    const occupancy = ((total - free) / total) * 100;
    if (occupancy > 85) return { label: "KRİTİK", color: "bg-orange-100 text-orange-600 border-orange-200" };
    return { label: "MÜSAİT", color: "bg-green-100 text-green-600 border-green-200" };
  };

  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF9]">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-border/10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => selectedLot ? setSelectedLot(null) : window.history.back()} 
            className="p-2 bg-white rounded-xl shadow-soft border border-border/50 active:scale-90 transition-transform"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </button>
          <h1 className="text-xl font-bold text-primary tracking-tight">
            {selectedLot ? "Otopark Detayı" : "Otopark Doluluk"}
          </h1>
        </div>
        {!selectedLot && (
          <button 
            onClick={() => { setLoading(true); fetchData(); }} 
            className={cn("p-2 text-primary transition-all", loading && "animate-spin")}
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        )}
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-6 max-w-md mx-auto">
        
        {/* Active Reservation Ticket */}
        {activeReservation && (
          <section className="animate-in slide-in-from-top-4 duration-500">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8D3B4A]/50 to-accent/50 rounded-[2.5rem] blur opacity-25"></div>
              <Card className="relative border-none bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-primary/5">
                <div className="bg-[#8D3B4A] p-4 flex justify-between items-center text-white">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Aktif Giriş Kartı</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full">
                    <Clock className="h-3 w-3" />
                    <span className="text-[10px] font-black">{timeLeft || "00:00"}</span>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-black text-foreground">{activeReservation.lotName}</h4>
                    <p className="text-xs font-bold text-primary uppercase">{activeReservation.floor}</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-3xl border-2 border-dashed border-primary/20 mb-4 relative group">
                    <QrCode className="h-32 w-32 text-[#8D3B4A]" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 backdrop-blur-[2px] rounded-3xl">
                       <p className="text-[10px] font-black text-[#8D3B4A] uppercase tracking-tighter">Bariyerde Okutunuz</p>
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    <div className="flex justify-between items-center px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Randevu Kodu</span>
                      <span className="text-sm font-mono font-black text-[#8D3B4A]">{activeReservation.code}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={() => startExternalNavigation(parkingLots?.find(l => l.id === activeReservation.lotId)?.coords || "")} className="flex-1 h-11 rounded-xl bg-primary text-white text-xs font-bold gap-2">
                        <Navigation className="h-4 w-4" /> Yol Tarifi
                      </Button>
                      <Button onClick={cancelReservation} variant="outline" className="flex-1 h-11 rounded-xl border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold">
                        İptal Et
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {loading && !parkingLots ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm font-bold text-muted-foreground animate-pulse">Veriler taranıyor...</p>
          </div>
        ) : !selectedLot ? (
          <>
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <p className="text-xs text-primary/80 leading-relaxed font-medium">
                Isparta genelindeki akıllı otoparkların 15 saniyede bir güncellenen canlı durumları.
              </p>
            </div>

            <div className="space-y-4">
              {parkingLots?.map((lot) => {
                const status = getStatusInfo(lot.free, lot.total);
                return (
                  <Card 
                    key={lot.id} 
                    className="border-none shadow-soft rounded-2xl overflow-hidden bg-white cursor-pointer active:scale-[0.98] transition-all hover:bg-primary/5"
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
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "px-2 py-1 rounded-md text-[8px] font-black border",
                          status.color
                        )}>
                          {status.label}
                        </span>
                        <ChevronRight className="h-5 w-5 text-muted-foreground/30" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
            {/* Lot Summary */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-foreground tracking-tight">{selectedLot.name}</h2>
              <div className="flex justify-center items-center gap-2 text-xs font-bold text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{selectedLot.distance} • {selectedLot.price}</span>
              </div>
            </div>

            {/* Floor Status with Booking */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Kat Bazlı Doluluk</h3>
              {selectedLot.floors.map((floor: any, idx: number) => (
                <Card 
                  key={idx} 
                  className={cn(
                    "border-none shadow-sm rounded-2xl transition-all overflow-hidden",
                    floor.isFull 
                      ? "bg-[#8D3B4A]/5 border-[#8D3B4A]/20" 
                      : "bg-white border border-border/30 shadow-soft"
                  )}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold block mb-0.5">{floor.label}</span>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        floor.isFull ? "text-[#8D3B4A]" : "text-green-600"
                      )}>
                        {floor.status}
                      </span>
                    </div>
                    {!floor.isFull && !activeReservation && (
                      <Button 
                        onClick={() => handleBooking(floor.label)}
                        size="sm"
                        className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider gap-2 shadow-lg shadow-primary/20"
                      >
                        <CalendarCheck className="h-3.5 w-3.5" />
                        Randevu Al
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Smart Advice */}
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

            {/* Navigation Button */}
            <Button 
              onClick={() => startExternalNavigation(selectedLot.coords)}
              className="w-full h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-base shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              <Navigation className="h-6 w-6" />
              Navigasyonu Başlat
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
