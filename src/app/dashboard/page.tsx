
"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Library, Car, Bell, User, MapPin, Info, ArrowRight, Sparkles, CreditCard, Wifi, Droplets, Receipt, Gift, Bus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function Dashboard() {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  const services = [
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
      color: "bg-primary/10 text-primary",
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
    {
      title: "Belediye Duyuruları",
      description: "Güncel haberler ve etkinlikler",
      icon: Bell,
      href: "/announcements",
      color: "bg-orange-100 text-orange-600",
      liveStatus: "3 Yeni",
    },
  ];

  const rewards = [
    { title: "1 Saat Ücretsiz Otopark", cost: "1000 Puan", icon: Car },
    { title: "Halk Otobüsünde 2 Biniş", cost: "500 Puan", icon: Bus },
    { title: "Kütüphanede 1 Kahve İkramı", cost: "300 Puan", icon: Sparkles },
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
    <div className="pb-24 md:pb-8 bg-background min-h-screen">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">İyi günler,</h2>
          <h1 className="text-2xl font-bold text-primary">Merhaba Vatandaş</h1>
        </div>
        <Link href="/profile" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm overflow-hidden active:scale-95 transition-transform">
          <User className="text-primary h-6 w-6" />
        </Link>
      </header>

      <main className="px-6 space-y-8 animate-fade-in">
        
        {/* Isparta Kart Entegrasyonu */}
        <section>
          <div className="relative group cursor-pointer">
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
                  <p className="text-3xl font-bold">145.50 ₺</p>
                </div>

                <div className="flex justify-between items-end">
                  <p className="text-xs font-mono tracking-tighter opacity-70">**** **** **** 1234</p>
                  <div className="h-8 w-12 bg-white/20 rounded-md backdrop-blur-sm border border-white/10" />
                </div>
              </CardContent>
            </Card>
          </div>
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
                    <p className="text-[10px] text-muted-foreground">Son Ödeme: 25 Haziran</p>
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

        {/* Featured Card */}
        <section>
          <div className="relative overflow-hidden rounded-2xl bg-secondary/50 p-6 border border-border shadow-soft group">
             <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-bold px-3">Canlı Veri</Badge>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" /> Aktif
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 text-primary">Halil Hamit Paşa Kütüphanesi</h3>
                <p className="text-muted-foreground text-sm mb-6 font-medium">Şu an <span className="text-accent font-bold">%74 dolu</span>. Yaklaşık 45 masa boş.</p>
                <Link href="/library" className="inline-flex items-center gap-2 text-xs font-bold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95">
                  Yerini Ayırt <ArrowRight className="h-4 w-4" />
                </Link>
             </div>
          </div>
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
                      <p className="text-[11px] text-muted-foreground">{service.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
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
          <p className="text-xs text-muted-foreground leading-relaxed">
            Isparta Belediyesi olarak, şehrimizin simgesi olan gülün estetiğini teknolojinin gücüyle birleştiriyoruz. Dijital dönüşümle yaşam kalitenizi artırmaya devam ediyoruz.
          </p>
        </section>
      </main>

      {/* Reward Points Modal */}
      <Dialog open={isRewardModalOpen} onOpenChange={setIsRewardModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md rounded-2xl p-6 border-none bg-white">
          <DialogHeader>
            <div className="w-12 h-12 bg-reward/10 rounded-full flex items-center justify-center text-reward mb-4 mx-auto">
              <Gift className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center text-xl font-bold">Puanlarımı Kullan</DialogTitle>
            <DialogDescription className="text-center text-sm">
              Kazandığın Gül Puanları şehir içinde harcayabilirsin.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center px-4 py-2 bg-reward/5 rounded-lg mb-4">
              <span className="text-xs font-bold text-reward uppercase tracking-widest">Mevcut Bakiyen</span>
              <span className="text-lg font-bold text-reward">1250 Puan</span>
            </div>

            {rewards.map((reward, i) => (
              <button 
                key={i} 
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-reward/30 hover:bg-reward/5 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-reward transition-colors">
                    <reward.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{reward.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{reward.cost}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-reward/50 transition-colors" />
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsRewardModalOpen(false)}
              className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Şimdilik Kapat
            </button>
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
