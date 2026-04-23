
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
  Wallet,
  Flower2,
  Star,
  Moon,
  Sun
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
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
    <div className={cn(
      "pb-24 md:pb-8 min-h-screen transition-colors duration-500",
      isDarkMode ? "bg-[#0F0F10] text-white" : "bg-[#FDFBF9] text-foreground"
    )}>
      <header className={cn(
        "px-6 pt-8 pb-6 flex justify-between items-center backdrop-blur-md sticky top-0 z-40 border-b transition-colors duration-500",
        isDarkMode ? "bg-black/40 border-white/5" : "bg-white/50 border-transparent"
      )}>
        <div>
          <h2 className={cn(
            "text-sm font-medium transition-colors",
            isDarkMode ? "text-white/50" : "text-muted-foreground"
          )}>İyi günler,</h2>
          <div className="flex items-center gap-3">
            <h1 className={cn(
              "text-2xl font-semibold tracking-tight italic transition-colors",
              isDarkMode ? "text-white" : "text-primary"
            )}>Merhaba, Yasin</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 rounded-full shadow-lg shadow-yellow-500/30 border border-white/20 animate-pulse-subtle">
            <Star className="h-3.5 w-3.5 text-white fill-white" />
            <span className="text-[10px] font-black text-white whitespace-nowrap uppercase tracking-wider">50 Gül Puan</span>
          </div>
          <div className="flex items-center gap-2 ml-1">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={cn(
                "w-10 h-10 rounded-xl border shadow-soft flex items-center justify-center transition-all duration-300",
                isDarkMode 
                  ? "bg-white/10 border-white/10 text-yellow-400" 
                  : "bg-white border-border text-primary"
              )}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={handleShareApp} className={cn(
              "w-10 h-10 rounded-xl border shadow-soft flex items-center justify-center transition-colors",
              isDarkMode ? "bg-white/10 border-white/10 text-white" : "bg-white border-border text-primary"
            )}>
              <Share2 className="h-5 w-5" />
            </button>
            <Link href="/profile" className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm overflow-hidden transition-colors",
              isDarkMode 
                ? "bg-white/10 border-white/20 text-white" 
                : "bg-primary/10 border-primary/20 text-primary"
            )}>
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      <motion.main 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 space-y-6 mt-6"
      >
        <section>
          <Link href="/isparta-kart" className="block">
            <div className="relative group cursor-pointer transition-transform active:scale-[0.98]">
              <div className={cn(
                "absolute -inset-0.5 rounded-2xl blur opacity-30 transition-all",
                isDarkMode ? "bg-white" : "bg-gradient-to-r from-primary to-accent"
              )}></div>
              <Card className={cn(
                "relative border-none text-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500",
                isDarkMode 
                  ? "bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" 
                  : "bg-gradient-to-br from-primary via-primary/90 to-primary/80"
              )}>
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
          <div className="grid grid-cols-2 gap-4">
            <Link href="/discover" className="block group">
              <div className="relative rounded-3xl overflow-hidden shadow-lg h-full bg-gradient-to-br from-rose-400 to-pink-500 text-white transform transition-transform duration-300 group-hover:scale-[1.03] active:scale-95">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="relative h-full p-4 flex flex-col justify-between">
                  <div className="flex justify-start">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg">
                      <Flower2 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-bold text-lg leading-tight">Isparta'yı Keşfet</h3>
                    <p className="text-sm text-white/90 font-sans">Güller Diyarı & Tarih</p>
                  </div>
                </div>
              </div>
            </Link>
            <div className="space-y-4">
              <Link href="/isparta-kart">
                <Card className={cn(
                  "p-4 border-none shadow-soft rounded-xl transition-all duration-500",
                  isDarkMode ? "bg-white/5 backdrop-blur-xl border border-white/10" : "bg-white"
                )}>
                   <div className={cn(
                     "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                     isDarkMode ? "bg-red-500/20 text-red-400" : "bg-red-50 text-red-600"
                   )}><Gift className="h-5 w-5" /></div>
                  <h4 className="font-bold text-xs">Gül Puanlarım</h4>
                  <p className={cn(
                    "text-[10px]",
                    isDarkMode ? "text-white/40" : "text-muted-foreground"
                  )}>Ödülleri görüntüle</p>
                </Card>
              </Link>
               <Link href="/announcements">
                <Card className={cn(
                  "p-4 border-none shadow-soft rounded-xl transition-all duration-500",
                  isDarkMode ? "bg-white/5 backdrop-blur-xl border border-white/10" : "bg-white"
                )}>
                   <div className={cn(
                     "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                     isDarkMode ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-50 text-yellow-600"
                   )}><Info className="h-5 w-5" /></div>
                  <h4 className="font-bold text-xs">Duyurular</h4>
                  <p className={cn(
                    "text-[10px]",
                    isDarkMode ? "text-white/40" : "text-muted-foreground"
                  )}>Şehrinizden haberler</p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section>
          <Link href="/isparta-kart">
            <Card className={cn(
              "border-none shadow-soft rounded-2xl overflow-hidden border-l-4 transition-all duration-500 animate-pulse-subtle",
              isDarkMode 
                ? "bg-white/5 backdrop-blur-xl border border-white/10 border-l-accent" 
                : "bg-white border-l-accent"
            )}>
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    isDarkMode ? "bg-accent/20 text-accent" : "bg-accent/10 text-accent"
                  )}>
                    <div className="relative">
                      <Droplets className="h-6 w-6" />
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Bekleyen Su Faturası</h3>
                    <p className={cn(
                      "text-[10px] font-medium",
                      isDarkMode ? "text-white/40" : "text-muted-foreground"
                    )}>Son Ödeme: 25 Haziran</p>
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
              <Card className={cn(
                "p-4 border-none shadow-soft rounded-xl transition-all duration-500",
                isDarkMode ? "bg-white/5 backdrop-blur-xl border border-white/10" : "bg-white"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                  isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-50 text-green-600"
                )}><Bus className="h-5 w-5" /></div>
                <h4 className="font-bold text-xs">Canlı Ulaşım</h4>
                <p className={cn(
                  "text-[10px]",
                  isDarkMode ? "text-white/40" : "text-muted-foreground"
                )}>Otobüs nerede?</p>
              </Card>
            </Link>
            <Link href="/parking">
              <Card className={cn(
                "p-4 border-none shadow-soft rounded-xl transition-all duration-500",
                isDarkMode ? "bg-white/5 backdrop-blur-xl border border-white/10" : "bg-white"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                  isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"
                )}><Car className="h-5 w-5" /></div>
                <h4 className="font-bold text-xs">Otoparklar</h4>
                <p className={cn(
                  "text-[10px]",
                  isDarkMode ? "text-white/40" : "text-muted-foreground"
                )}>Doluluk oranları</p>
              </Card>
            </Link>
          </div>
        </section>
      </motion.main>

      <BottomNav />
    </div>
  );
}
