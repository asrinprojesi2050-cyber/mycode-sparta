
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
  Share2,
  Loader2,
  Wallet
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
  DialogDescription
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [displayPoints, setDisplayPoints] = useState(1250);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  useEffect(() => {
    if (displayPoints > currentPoints) {
      const timer = setTimeout(() => {
        setDisplayPoints(prev => prev - 5);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [currentPoints, displayPoints]);

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
    }, 1500);
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'MyCode City - Isparta',
      text: 'Isparta için akıllı şehir mobil uygulamasını keşfedin!',
      url: typeof window !== 'undefined' ? window.location.origin : '',
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {}
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({ title: "Başarılı", description: "Link kopyalandı." });
      } catch (err) {}
    }
  };

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
      <header className="px-6 pt-8 pb-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">İyi günler,</h2>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Merhaba Vatandaş</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleShareApp} className="w-10 h-10 rounded-xl bg-white border border-border shadow-soft flex items-center justify-center text-primary">
            <Share2 className="h-5 w-5" />
          </button>
          <Link href="/profile" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm overflow-hidden">
            <User className="text-primary h-6 w-6" />
          </Link>
        </div>
      </header>

      <main className="px-6 space-y-8 animate-fade-in">
        <section>
          <Link href="/isparta-kart" className="block">
            <div className="relative group cursor-pointer transition-transform active:scale-[0.98]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30"></div>
              <Card className="relative border-none bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10"><RoseIcon /></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-10">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold">Cüzdan & Kart</p>
                      <div className="flex items-center gap-2"><RoseIcon /><span className="font-bold text-lg">Cüzdanım</span></div>
                    </div>
                    <Wallet className="h-5 w-5 text-white/60" />
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

        <section>
          <Button onClick={() => setIsRewardModalOpen(true)} variant="outline" className="w-full h-12 rounded-xl border-reward/30 text-reward bg-white shadow-soft gap-2">
            <Gift className="h-4 w-4" /><span className="font-bold text-sm">Gül Puanlarımı Kullan</span>
          </Button>
        </section>

        <section>
          <Link href="/isparta-kart">
            <Card className="border-none bg-white shadow-soft rounded-2xl overflow-hidden border-l-4 border-l-accent animate-pulse-subtle">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <div className="relative">
                      <Droplets className="h-6 w-6" />
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Bekleyen Su Faturası</h3>
                    <p className="text-[10px] text-muted-foreground font-medium">Son Ödeme: 25 Haziran</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent">145.50 ₺</p>
                  <span className="text-[9px] font-bold text-white bg-accent px-2 py-0.5 rounded-full">CÜZDANDAN ÖDE</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        <section>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/transport">
              <Card className="p-4 border-none shadow-soft bg-white rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mb-3"><Bus className="h-5 w-5" /></div>
                <h4 className="font-bold text-xs">Canlı Ulaşım</h4>
                <p className="text-[10px] text-muted-foreground">Otobüs nerede?</p>
              </Card>
            </Link>
            <Link href="/parking">
              <Card className="p-4 border-none shadow-soft bg-white rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3"><Car className="h-5 w-5" /></div>
                <h4 className="font-bold text-xs">Otoparklar</h4>
                <p className="text-[10px] text-muted-foreground">Doluluk oranları</p>
              </Card>
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
