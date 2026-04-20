
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Library, 
  Car, 
  User, 
  Info, 
  ArrowRight, 
  Sparkles, 
  Wifi, 
  Droplets, 
  Receipt, 
  Gift, 
  Bus, 
  ChevronRight, 
  Utensils, 
  Navigation,
  CheckCircle2,
  QrCode,
  X,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [displayPoints, setDisplayPoints] = useState(1250);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  // Puan azalış animasyonu
  useEffect(() => {
    if (displayPoints > currentPoints) {
      const timer = setTimeout(() => {
        setDisplayPoints(prev => prev - 5);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [currentPoints, displayPoints]);

  const rewards = [
    { title: "1 Saat Ücretsiz Otopark", cost: 1000, costText: "1000 Puan", icon: Car, code: "PARK-GL10" },
    { title: "Halk Otobüsünde 2 Biniş", cost: 500, costText: "500 Puan", icon: Bus, code: "BUS-GL05" },
    { title: "Kütüphanede 1 Kahve İkramı", cost: 300, costText: "300 Puan", icon: Sparkles, code: "KAHVE-GL42" },
  ];

  const handleRewardClick = (reward: any) => {
    setSelectedReward(reward);
    setIsConfirmOpen(true);
  };

  const confirmPurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setCurrentPoints(prev => prev - selectedReward.cost);
      setIsProcessing(false);
      setIsConfirmOpen(false);
      setIsTicketOpen(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }, 1500);
  };

  const services = [
    {
      title: "Canlı Ulaşım",
      description: "Otobüsün nerede? Hemen izle",
      icon: Navigation,
      href: "/transport",
      color: "bg-green-50 text-green-600",
      liveStatus: "Canlı",
    },
    {
      title: "Sosyal Tesisler",
      description: "Belediye restoranlarında doluluk",
      icon: Utensils,
      href: "/facilities",
      color: "bg-primary/10 text-primary",
      liveStatus: "3 Tesis",
    },
    {
      title: "Fatura Ödeme",
      description: "Su ve belediye borçlarını öde",
      icon: Receipt,
      href: "/payments",
      color: "bg-red-50 text-red-600",
      liveStatus: "1 Gecikmiş",
    },
    {
      title: "Kütüphane Randevu",
      description: "Çalışma masanı hemen ayırt",
      icon: Library,
      href: "/library",
      color: "bg-blue-50 text-blue-600",
      liveStatus: "%74 Dolu",
    },
    {
      title: "Otopark Doluluk",
      description: "Şehir genelindeki otoparkları izle",
      icon: Car,
      href: "/parking",
      color: "bg-accent/10 text-accent",
      liveStatus: "%82 Dolu",
    },
  ];

  const RoseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
      <path d="M12 22s-1-4-1-5 2-4 2-4" />
      <path d="M12 13c-1-1-4-2-4-4s1-3 2-3 2 1 2 3" />
      <path d="M12 13c1-1 4-2 4-4s-1-3-2-3-2 1-2 3" />
      <path d="M12 13v-4" />
      <circle cx="12" cy="7" r="3" />
    </svg>
  );

  return (
    <div className="pb-24 md:pb-8 bg-[#FDFBF9] min-h-screen">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">İyi günler,</h2>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Merhaba Vatandaş</h1>
        </div>
        <Link href="/profile" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm overflow-hidden active:scale-95 transition-transform">
          <User className="text-primary h-6 w-6" />
        </Link>
      </header>

      <main className="px-6 space-y-8 animate-fade-in">
        
        {/* Isparta Kart Entegrasyonu */}
        <section>
          <Link href="/isparta-kart" className="block">
            <div className="relative group cursor-pointer transition-transform active:scale-[0.98]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative border-none bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <RoseIcon />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-10">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold">Isparta Kart</p>
                      <div className="flex items-center gap-2">
                        <RoseIcon />
                        <span className="font-bold text-lg">MyCode City</span>
                      </div>
                    </div>
                    <Wifi className="h-5 w-5 text-white/60" />
                  </div>
                  
                  <div className="space-y-1 mb-6">
                    <p className="text-[10px] text-white/60 uppercase tracking-widest">Bakiye</p>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold">142.50 ₺</p>
                      <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md text-[10px] py-1 px-3">YÖNET</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <p className="text-xs font-mono tracking-tighter opacity-70">**** **** **** 1234</p>
                    <div className="h-8 w-12 bg-white/20 rounded-md backdrop-blur-sm border border-white/10" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Link>
        </section>

        {/* Puan Harcama Butonu */}
        <section>
          <Button 
            onClick={() => setIsRewardModalOpen(true)}
            variant="outline" 
            className="w-full h-12 rounded-xl border-reward/30 text-reward hover:bg-reward/5 bg-white shadow-soft flex items-center justify-center gap-2 group transition-all"
          >
            <Gift className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="font-bold text-sm">Gül Puanlarımı Kullan</span>
          </Button>
        </section>

        {/* Bekleyen Fatura Hatırlatıcı */}
        <section>
          <Link href="/payments">
            <Card className="border-none bg-white shadow-soft rounded-2xl overflow-hidden border-l-4 border-l-accent animate-pulse-subtle">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Bekleyen Su Faturası</h3>
                    <p className="text-[10px] text-muted-foreground font-medium">Son Ödeme: 25 Haziran</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent">145.50 ₺</p>
                  <span className="text-[9px] font-bold text-white bg-accent px-2 py-0.5 rounded-full">HEMEN ÖDE</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Hızlı Randevu Butonu */}
        <section>
          <Link href="/library">
            <Button className="w-full h-16 rounded-2xl bg-white border border-accent/20 text-accent hover:bg-accent/5 shadow-soft flex items-center justify-between px-6 group transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 animate-pulse opacity-50"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 animate-spin-slow" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent/60">Hızlı İşlem</p>
                  <p className="font-bold text-sm">Tek Tıkla Kütüphane Randevusu</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </Button>
          </Link>
        </section>

        {/* Services Grid */}
        <section>
          <div className="flex justify-between items-end mb-4">
             <h3 className="text-lg font-bold">Akıllı Hizmetler</h3>
             <button className="text-sm font-semibold text-primary">Tümünü Gör</button>
          </div>
          <div className="grid gap-4">
            {services.map((service) => (
              <Link key={service.href} href={service.href}>
                <Card className="border-none shadow-soft rounded-xl hover:shadow-md transition-all active:scale-98 bg-white overflow-hidden">
                  <CardContent className="p-4 flex items-center gap-4 relative">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", service.color)}>
                      <service.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{service.title}</h4>
                        <Badge variant="outline" className="text-[9px] py-0 px-1.5 h-4 border-primary/20 text-primary font-bold">
                          {service.liveStatus}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium">{service.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-white rounded-2xl p-6 border border-border shadow-soft relative overflow-hidden">
          <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
            <RoseIcon />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/5 rounded-lg text-primary">
              <Info className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-sm">MyCode City Vizyonu</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed font-medium">
            Isparta Belediyesi olarak, şehrimizin simgesi olan gülün estetiğini teknolojinin gücüyle birleştiriyoruz. Dijital dönüşümle yaşam kalitenizi artırmaya devam ediyoruz.
          </p>
        </section>
      </main>

      {/* Reward Points Modal */}
      <Dialog open={isRewardModalOpen} onOpenChange={setIsRewardModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md rounded-[2.5rem] p-6 border-none bg-white shadow-2xl">
          <DialogHeader>
            <div className="w-16 h-16 bg-reward/10 rounded-full flex items-center justify-center text-reward mb-4 mx-auto shadow-inner">
              <Gift className="h-8 w-8" />
            </div>
            <DialogTitle className="text-center text-2xl font-black tracking-tight">Puanlarımı Kullan</DialogTitle>
            <DialogDescription className="text-center text-sm font-medium text-muted-foreground">
              Kazandığın Gül Puanları şehir içinde harcayabilirsin.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center px-6 py-4 bg-reward/5 rounded-[1.5rem] border border-reward/10">
              <span className="text-xs font-bold text-reward uppercase tracking-[0.2em]">Mevcut Bakiyen</span>
              <span className="text-2xl font-black text-reward">{displayPoints} Puan</span>
            </div>

            <div className="space-y-3 max-h-[40vh] overflow-y-auto px-1">
              {rewards.map((reward, i) => (
                <button 
                  key={i} 
                  onClick={() => handleRewardClick(reward)}
                  className="w-full flex items-center justify-between p-5 rounded-2xl border border-border/60 hover:border-reward/40 hover:bg-reward/5 transition-all group active:scale-[0.98] bg-white shadow-sm"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-reward group-hover:bg-reward/10 transition-all duration-300">
                      <reward.icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{reward.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Sparkles className="h-3 w-3 text-reward" />
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-wider">{reward.costText}</p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-reward/50 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsRewardModalOpen(false)}
              className="text-[10px] font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.25em]"
            >
              Şimdilik Kapat
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-[85vw] sm:max-w-sm rounded-[2rem] p-8 border-none bg-white shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-black text-primary">Onay Verin</DialogTitle>
            <DialogDescription className="text-center text-sm pt-4 font-medium leading-relaxed">
              <span className="text-foreground font-bold">{selectedReward?.title}</span> için <span className="text-reward font-bold">{selectedReward?.cost} Gül Puan</span> harcanacaktır. İşlemi onaylıyor musunuz?
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 flex flex-col gap-3">
            <Button 
              onClick={confirmPurchase}
              disabled={isProcessing}
              className="w-full h-14 rounded-2xl bg-reward hover:bg-reward/90 text-white font-black text-lg shadow-xl shadow-reward/20 transition-all active:scale-95"
            >
              {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : "Evet, Onaylıyorum"}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsConfirmOpen(false)}
              className="w-full h-12 rounded-xl text-muted-foreground font-bold uppercase tracking-widest text-[10px]"
            >
              Vazgeç
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ticket/Success Modal */}
      <Dialog open={isTicketOpen} onOpenChange={setIsTicketOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-sm rounded-[2.5rem] p-0 overflow-hidden border-none bg-gradient-to-b from-white to-reward/5 shadow-2xl">
          <div className="p-8 flex flex-col items-center text-center">
             <div className="relative mb-8">
                <div className="absolute -inset-4 bg-reward/20 rounded-full animate-ping"></div>
                <div className="w-20 h-20 bg-reward rounded-full flex items-center justify-center text-white shadow-2xl shadow-reward/40 relative z-10">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
             </div>

             <div className="space-y-2 mb-8">
               <h3 className="text-2xl font-black text-foreground tracking-tight">Tebrikler!</h3>
               <p className="text-xs font-bold text-reward uppercase tracking-[0.2em]">Ödülünüz Kullanıma Hazır</p>
             </div>

             <div className="w-full bg-white rounded-[2rem] p-8 shadow-xl border border-reward/10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-reward/40 via-reward to-reward/40"></div>
                
                <div className="bg-secondary/30 p-4 rounded-2xl mb-6 flex items-center justify-center shadow-inner">
                   <QrCode className="h-40 w-40 text-foreground" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Bilet Kodu</p>
                    <p className="text-xl font-mono font-black text-primary tracking-tighter">{selectedReward?.code}</p>
                  </div>
                  <div className="h-px bg-dashed border-t border-dashed border-border/50 mx-4"></div>
                  <p className="text-[10px] font-bold text-muted-foreground leading-relaxed px-4">
                    Bu kodu ilgili noktadaki cihazlara okutarak veya görevliye göstererek ödülünüzü kullanabilirsiniz.
                  </p>
                </div>

                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FDFBF9] rounded-full border border-reward/5"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FDFBF9] rounded-full border border-reward/5"></div>
             </div>

             <Button 
               onClick={() => setIsTicketOpen(false)}
               className="mt-8 w-full h-14 rounded-2xl bg-white border border-reward/20 text-reward hover:bg-reward/5 font-black uppercase tracking-[0.2em] text-xs shadow-soft"
             >
               Cüzdanıma Git
             </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
