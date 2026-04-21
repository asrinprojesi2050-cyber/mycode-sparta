"use client"

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Car, MapPin, Navigation, Info, RefreshCw, 
  ChevronRight, Loader2, CalendarCheck, QrCode, X, CheckCircle2,
  Clock, Wallet, Sparkles, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Reservation {
  lotId: number;
  lotName: string;
  floor: string;
  code: string;
  expiresAt: number;
}

interface WalletData {
  bakiye: number;
  gulPuan: number;
}

export default function ParkingPage() {
  const [loading, setLoading] = useState(true);
  const [parkingLots, setParkingLots] = useState<any[] | null>(null);
  const [selectedLot, setSelectedLot] = useState<any | null>(null);
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingFloor, setPendingFloor] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const { toast } = useToast();

  const fetchWallet = async () => {
    try {
      const res = await fetch('/api/cuzdan');
      const data = await res.json();
      setWallet(data);
    } catch (error) {
      console.error('Cüzdan çekilemedi');
    }
  };

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
    fetchWallet();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [selectedLot?.id]);

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

  const initiateBooking = (floorLabel: string) => {
    setPendingFloor(floorLabel);
    setIsPaymentModalOpen(true);
  };

  const confirmPaymentAndBook = async (method: 'balance' | 'points') => {
    if (!pendingFloor || !selectedLot || !wallet) return;
    
    setIsProcessingPayment(true);
    
    try {
      // Ödeme İşlemi
      const paymentRes = await fetch('/api/cuzdan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: method === 'balance' ? 'deduct_balance' : 'deduct_points',
          amount: method === 'balance' ? 20 : 200
        })
      });

      const paymentResult = await paymentRes.json();
      
      if (!paymentResult.success) {
        toast({
          variant: "destructive",
          title: "Ödeme Başarısız",
          description: paymentResult.message,
        });
        setIsProcessingPayment(false);
        return;
      }

      // Randevu İşlemi
      const response = await fetch('/api/otopark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedLot.id,
          floorLabel: pendingFloor
        })
      });

      const result = await response.json();

      if (result.success) {
        const resCode = `PK-${Math.floor(1000 + Math.random() * 9000)}`;
        setActiveReservation({
          lotId: selectedLot.id,
          lotName: selectedLot.name,
          floor: pendingFloor,
          code: resCode,
          expiresAt: result.expiresAt
        });
        
        toast({
          title: "Ödeme ve Randevu Başarılı",
          description: `${selectedLot.name} için yeriniz rezerve edildi.`,
        });
        
        setWallet(paymentResult.data);
        setIsPaymentModalOpen(false);
        setPendingFloor(null);
        fetchData();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sistem Hatası",
        description: "İşlem şu an gerçekleştirilemiyor.",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleBarierPass = async () => {
    if (!activeReservation) return;

    try {
      // Ödül Puanı Ekle
      const rewardRes = await fetch('/api/cuzdan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_points', amount: 50 })
      });
      const rewardData = await rewardRes.json();

      // Randevuyu Temizle (Bariyerden geçtiği için otopark API'sini de tetikleyebiliriz ama şimdilik iptal mantığıyla aynı)
      await fetch('/api/otopark', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: activeReservation.lotId, floorLabel: activeReservation.floor })
      });

      setActiveReservation(null);
      setWallet(rewardData.data);
      
      toast({
        title: "Giriş Başarılı",
        description: "Zamanında giriş yaptığınız için +50 Gül Puan kazandınız!",
      });
      
      fetchData();
    } catch (error) {
      console.error('Bariyer hatası');
    }
  };

  const cancelReservation = async () => {
    if (!activeReservation) return;

    try {
      const response = await fetch('/api/otopark', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activeReservation.lotId,
          floorLabel: activeReservation.floor
        })
      });

      const result = await response.json();

      if (result.success) {
        setActiveReservation(null);
        toast({
          description: "Randevunuz iptal edildi.",
        });
        fetchData();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "İptal Hatası",
        description: "İptal işlemi şu an gerçekleştirilemiyor.",
      });
    }
  };

  const getStatusInfo = (free: number, total: number) => {
    if (free <= 0) return { label: "DOLU", color: "bg-red-100 text-[#8D3B4A] border-red-200" };
    const occupancy = ((total - free) / total) * 100;
    if (occupancy > 85) return { label: "KRİTİK", color: "bg-orange-100 text-orange-600 border-orange-200" };
    return { label: "MÜSAİT", color: "bg-green-100 text-green-600 border-green-200" };
  };

  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF9]">
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
        <div className="flex items-center gap-2">
          {wallet && (
            <div className="px-3 py-1 bg-white border border-border rounded-lg shadow-sm flex items-center gap-2">
               <Wallet className="h-3 w-3 text-primary" />
               <span className="text-[10px] font-bold text-primary">{wallet.bakiye.toFixed(2)} ₺</span>
            </div>
          )}
        </div>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-6 max-w-md mx-auto">
        
        {activeReservation && (
          <section className="animate-in slide-in-from-top-4 duration-500">
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
                
                <div className="p-4 bg-secondary/30 rounded-3xl border-2 border-dashed border-primary/20 mb-4">
                  <QrCode className="h-32 w-32 text-[#8D3B4A]" />
                </div>

                <div className="w-full space-y-3">
                  <div className="flex justify-between items-center px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Randevu Kodu</span>
                    <span className="text-sm font-mono font-black text-[#8D3B4A]">{activeReservation.code}</span>
                  </div>
                  
                  <Button onClick={handleBarierPass} className="w-full h-11 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold gap-2 animate-pulse">
                    Bariyerden Geç (Test)
                  </Button>

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
                Isparta genelindeki akıllı otoparkların canlı durumları.
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
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-foreground tracking-tight">{selectedLot.name}</h2>
              <div className="flex justify-center items-center gap-2 text-xs font-bold text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{selectedLot.distance} • {selectedLot.price}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Kat Bazlı Doluluk</h3>
              {selectedLot.floors.map((floor: any, idx: number) => (
                <Card 
                  key={idx} 
                  className={cn(
                    "border-none shadow-sm rounded-2xl transition-all overflow-hidden",
                    floor.isFull 
                      ? "bg-secondary/20 border-border/10" 
                      : "bg-white border border-border/30 shadow-soft"
                  )}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold block mb-0.5">{floor.label}</span>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        floor.isFull ? "text-[#8D3B4A]/60" : "text-green-600"
                      )}>
                        {floor.status}
                      </span>
                    </div>
                    {!activeReservation && (
                      <Button 
                        onClick={() => initiateBooking(floor.label)}
                        disabled={floor.isFull}
                        size="sm"
                        className={cn(
                          "h-9 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider gap-2 shadow-lg",
                          floor.isFull 
                            ? "bg-secondary text-muted-foreground/50 cursor-not-allowed shadow-none" 
                            : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                        )}
                      >
                        <CalendarCheck className="h-3.5 w-3.5" />
                        Randevu Al
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

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

      {/* Payment Selection Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md rounded-3xl p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-primary">Ödeme Onayı</DialogTitle>
            <DialogDescription className="text-center text-xs font-medium">
              {selectedLot?.name} - {pendingFloor} için randevunuzu onaylayın.
            </DialogDescription>
          </DialogHeader>

          {isProcessingPayment ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
               <Loader2 className="h-10 w-10 text-primary animate-spin" />
               <p className="text-sm font-bold text-primary animate-pulse">İşlem Yapılıyor...</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
               <button 
                 onClick={() => confirmPaymentAndBook('balance')}
                 className="w-full p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:border-primary transition-all text-left flex items-center justify-between group"
               >
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Wallet className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-foreground">Isparta Kart Bakiyesi</p>
                        <p className="text-[10px] text-muted-foreground">Mevcut: {wallet?.bakiye.toFixed(2)} ₺</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-black text-primary">-20.00 ₺</p>
                  </div>
               </button>

               <button 
                 onClick={() => confirmPaymentAndBook('points')}
                 className="w-full p-4 rounded-2xl bg-reward/5 border border-reward/10 hover:border-reward transition-all text-left flex items-center justify-between group"
               >
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-reward/10 flex items-center justify-center text-reward">
                        <Sparkles className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-foreground">Gül Puan ile Öde</p>
                        <p className="text-[10px] text-muted-foreground">Mevcut: {wallet?.gulPuan} Puan</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-black text-reward">-200 Puan</p>
                  </div>
               </button>

               <div className="flex items-center justify-center gap-2 pt-2">
                  <ShieldCheck className="h-4 w-4 text-primary opacity-40" />
                  <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Güvenli Ödeme Sistemi</span>
               </div>
            </div>
          )}
          <DialogFooter>
             <Button variant="ghost" onClick={() => setIsPaymentModalOpen(false)} className="w-full text-xs font-bold text-muted-foreground">Vazgeç</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
