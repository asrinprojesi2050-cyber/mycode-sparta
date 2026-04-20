
"use client"

import { useState, useEffect } from 'react';
import { ArrowLeft, Wifi, QrCode, CreditCard, Plus, ChevronRight, History, Info, Sparkles, X, Loader2, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type QrModalState = 'idle' | 'counting' | 'success';

export default function IspartaKartPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isCustomAmountOpen, setIsCustomAmountOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [qrState, setQrState] = useState<QrModalState>('idle');
  const [qrCountdown, setQrCountdown] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // QR Interaction Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQrModalOpen && qrState === 'counting') {
      if (qrCountdown > 0) {
        timer = setInterval(() => {
          setQrCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
        setQrState('success');
        
        timer = setTimeout(() => {
          handleCloseQr();
        }, 3000);
      }
    }
    return () => clearInterval(timer);
  }, [isQrModalOpen, qrState, qrCountdown]);

  const handleOpenQr = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
    setQrCountdown(5);
    setQrState('counting');
    setIsQrModalOpen(true);
  };

  const handleCloseQr = () => {
    setIsQrModalOpen(false);
    setTimeout(() => {
      setQrState('idle');
      setQrCountdown(5);
    }, 300);
  };

  const handleTopup = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsTopupModalOpen(false);
      }, 2000);
    }, 1500);
  };

  const handleCustomAmountConfirm = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      setSelectedAmount(amount);
      setIsCustomAmountOpen(false);
    }
  };

  const transactions = [
    { id: 1, title: "Halk Otobüsü - Hat 18", date: "Bugün, 08:45", amount: "-15.00 ₺", type: "payment" },
    { id: 2, title: "Bakiye Yükleme", date: "Dün, 14:20", amount: "+100.00 ₺", type: "topup" },
    { id: 3, title: "Halk Otobüsü - Hat 4", date: "12 Haz, 17:30", amount: "-15.00 ₺", type: "payment" },
  ];

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
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Isparta Kartım</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-8 max-w-md mx-auto">
        {/* Virtual Card Section */}
        <section className="flex justify-center">
          <div className="relative group w-full max-w-[340px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-[1.5rem] blur-xl opacity-20 transition duration-1000 group-hover:opacity-40"></div>
            <Card className="relative border-none bg-gradient-to-br from-[#8D3B4A] via-[#A64459] to-[#8D3B4A] text-white rounded-[1.25rem] overflow-hidden shadow-2xl aspect-[1.58/1] flex flex-col justify-between p-6 border border-white/10">
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 bg-white/10 rounded-lg backdrop-blur-md">
                      <RoseIcon />
                    </div>
                    <span className="font-bold text-[10px] tracking-tight uppercase">MyCode City</span>
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

        {/* Enhanced Top-up Section */}
        <section className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hızlı Bakiye Yükle</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[50, 100, 200].map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
                className={cn(
                  "py-3.5 rounded-xl font-bold transition-all border-2 text-sm",
                  selectedAmount === amount 
                    ? "bg-primary text-white border-primary shadow-lg scale-105" 
                    : "bg-white text-primary border-transparent shadow-soft"
                )}
              >
                {amount} ₺
              </button>
            ))}
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Ödeme Yöntemi</h3>
            <Card className="border-none shadow-soft rounded-xl bg-white overflow-hidden border border-border/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-primary/5 rounded-md flex items-center justify-center border border-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground/80 tracking-tight">**** **** **** 4242</p>
                </div>
                <button className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline">Değiştir</button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => selectedAmount && setIsTopupModalOpen(true)}
              disabled={!selectedAmount}
              className="w-full h-14 rounded-2xl bg-primary text-white hover:bg-primary/90 shadow-xl font-bold text-base transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus className="h-5 w-5" />
              {selectedAmount ? `${selectedAmount} ₺ Yükle (Kredi Kartı ile)` : "Tutar Seçiniz"}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-muted-foreground/60">
              <Lock className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Güvenli 256-bit SSL Ödeme</span>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => setIsCustomAmountOpen(true)}
              className="w-full text-xs text-muted-foreground font-bold uppercase tracking-wider h-10"
            >
              Farklı Tutar Yükle
            </Button>
          </div>
        </section>

        {/* QR Button Section */}
        <section>
          <button 
            onClick={handleOpenQr}
            className="w-full relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative w-full h-20 rounded-2xl bg-white border border-accent/20 flex items-center justify-between px-6 shadow-soft overflow-hidden active:scale-[0.98] transition-all">
              <div className="absolute inset-0 bg-accent/5 animate-pulse opacity-50"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                  <QrCode className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-base font-black text-accent tracking-tight">QR Okut & Bin</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Hızlı Dijital Biniş</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:translate-x-1 transition-transform relative z-10">
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          </button>
        </section>

        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Son Hareketler</h2>
            <Link href="/isparta-kart/history" className="text-[10px] font-bold text-primary uppercase tracking-wider">Tümünü Gör</Link>
          </div>
          <div className="space-y-3">
            {transactions.map((t) => (
              <Card key={t.id} className="border-none shadow-soft rounded-2xl bg-white overflow-hidden active:scale-[0.99] transition-transform">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      t.type === 'payment' ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"
                    )}>
                      {t.type === 'payment' ? <History className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{t.title}</p>
                      <p className="text-[9px] text-muted-foreground font-medium">{t.date}</p>
                    </div>
                  </div>
                  <p className={cn(
                    "font-bold text-xs",
                    t.type === 'payment' ? "text-foreground" : "text-green-600"
                  )}>{t.amount}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Custom Amount Modal */}
      <Dialog open={isCustomAmountOpen} onOpenChange={setIsCustomAmountOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-sm rounded-[2.5rem] p-8 border-none bg-white shadow-2xl overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-primary">Tutar Giriniz</DialogTitle>
            <DialogDescription className="text-center text-xs text-muted-foreground uppercase tracking-wider font-bold">Yüklenecek Özel Bakiyeyi Belirleyin</DialogDescription>
          </DialogHeader>
          
          <div className="py-8 flex flex-col items-center">
            <div className="relative w-full max-w-[200px]">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-black text-muted-foreground/30">₺</span>
              <Input
                type="number"
                inputMode="decimal"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="0"
                className={cn(
                  "border-none bg-transparent text-center text-6xl font-black focus-visible:ring-0 h-20 p-0 transition-colors",
                  customAmount ? "text-primary" : "text-muted-foreground/30"
                )}
              />
            </div>
            <div className="mt-8 w-full space-y-4">
              <Button 
                onClick={handleCustomAmountConfirm}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
                className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl"
              >
                Onayla
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsCustomAmountOpen(false)}
                className="w-full text-muted-foreground font-bold uppercase tracking-wider text-xs"
              >
                Vazgeç
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Top-up Confirmation Modal */}
      <Dialog open={isTopupModalOpen} onOpenChange={setIsTopupModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md rounded-2xl p-6 border-none bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-primary">
              {isSuccess ? "Yükleme Başarılı" : "Yüklemeyi Onayla"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-6 flex flex-col items-center justify-center gap-4">
            {isSuccess ? (
              <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <p className="text-sm font-medium text-center">Bakiyeniz güncellendi!</p>
              </div>
            ) : (
              <>
                <div className="w-full bg-primary/5 rounded-2xl p-6 text-center space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Yüklenecek Tutar</p>
                  <p className="text-4xl font-black text-primary">{selectedAmount} ₺</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground bg-secondary/30 p-4 rounded-xl w-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>**** **** **** 4242 numaralı kartınız kullanılacak.</span>
                </div>
              </>
            )}
          </div>

          {!isSuccess && (
            <DialogFooter className="flex-col gap-3">
              <Button 
                onClick={handleTopup} 
                disabled={isProcessing}
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl bg-primary hover:bg-primary/90"
              >
                {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : "Ödemeyi Onayla"}
              </Button>
              <Button variant="ghost" onClick={() => setIsTopupModalOpen(false)} className="w-full text-muted-foreground">Vazgeç</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={isQrModalOpen} onOpenChange={handleCloseQr}>
        <DialogContent className="max-w-[85vw] sm:max-w-sm rounded-[2.5rem] p-8 border-none bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col items-center gap-8 py-4">
            {qrState === 'counting' ? (
              <div className="flex flex-col items-center gap-8 w-full animate-in fade-in zoom-in duration-300">
                <div className="text-center space-y-1">
                  <DialogTitle className="text-2xl font-black text-accent tracking-tight">Dijital Biniş</DialogTitle>
                  <DialogDescription className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Kullanıma Hazır</DialogDescription>
                </div>

                <div className="relative p-6 bg-white rounded-[2rem] shadow-inner border-4 border-accent/20 group">
                  <div className="absolute inset-0 bg-accent/5 animate-pulse rounded-[1.8rem]"></div>
                  <QrCode className="h-48 w-48 text-accent relative z-10" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent/30 animate-[scan_2s_linear_infinite] blur-sm z-20"></div>
                </div>

                <div className="text-center space-y-4 w-full">
                  <p className="text-xs font-medium text-foreground/70">Otobüsteki cihaza okutunuz</p>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent text-accent font-bold text-xl">
                    {qrCountdown}
                  </div>
                </div>
              </div>
            ) : qrState === 'success' ? (
              <div className="flex flex-col items-center gap-6 py-10 w-full animate-in zoom-in-95 duration-500">
                <div className="relative">
                  <div className="absolute -inset-4 bg-green-500/20 rounded-full animate-ping"></div>
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/30">
                    <CheckCircle2 className="h-14 w-14" />
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-black text-green-600 tracking-tight">İyi Yolculuklar Yasin!</h3>
                  <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                    <p className="text-xs font-bold text-green-700">Bakiyenizden <span className="text-lg">15.00 ₺</span> düşüldü.</p>
                  </div>
                </div>
              </div>
            ) : null}

            <Button 
              variant="ghost" 
              onClick={handleCloseQr}
              className="p-2 rounded-full hover:bg-accent/10 text-muted-foreground"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>

      <BottomNav />
    </div>
  );
}
