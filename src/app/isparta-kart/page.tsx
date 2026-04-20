
"use client"

import { useState } from 'react';
import { ArrowLeft, Wifi, QrCode, CreditCard, Plus, ChevronRight, History, Info, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';

export default function IspartaKartPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const transactions = [
    { id: 1, title: "Halk Otobüsü - Hat 1", date: "Bugün, 08:45", amount: "-4.50 ₺", type: "payment" },
    { id: 2, title: "Bakiye Yükleme", date: "Dün, 14:20", amount: "+100.00 ₺", type: "topup" },
    { id: 3, title: "Halk Otobüsü - Hat 4", date: "12 Haz, 17:30", amount: "-4.50 ₺", type: "payment" },
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
        <h1 className="text-xl font-bold text-primary tracking-tight">Isparta Kart</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-8">
        {/* Virtual Card Section */}
        <section>
          <div className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-[2rem] blur-xl opacity-20 transition duration-1000 group-hover:opacity-40"></div>
            <Card className="relative border-none bg-gradient-to-br from-[#8D3B4A] via-[#A64459] to-[#8D3B4A] text-white rounded-[1.75rem] overflow-hidden shadow-2xl aspect-[1.6/1] flex flex-col justify-between p-8 border border-white/10">
              {/* Card Decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md">
                      <RoseIcon />
                    </div>
                    <span className="font-bold text-sm tracking-tight uppercase">MyCode City</span>
                  </div>
                  <p className="text-[10px] text-white/60 uppercase tracking-[0.2em] font-medium">Sanal Ulaşım Kartı</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-8 w-12 bg-white/20 rounded-md backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <div className="w-6 h-4 bg-gradient-to-r from-yellow-400/80 to-yellow-600/80 rounded-[2px]" />
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1 font-bold">Güncel Bakiye</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tighter">142.50</span>
                  <span className="text-xl font-medium opacity-80">₺</span>
                </div>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono tracking-[0.3em] opacity-40">5432 **** **** 1234</p>
                  <p className="text-[9px] font-bold uppercase tracking-wider opacity-60">Vatandaş Kart</p>
                </div>
                <div className="p-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                  <Wifi className="h-5 w-5 text-white/70 rotate-90" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Top-up Section */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bakiye Yükle</h2>
          <div className="grid grid-cols-3 gap-3">
            {[50, 100, 200].map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={cn(
                  "py-4 rounded-2xl font-bold transition-all border-2 text-sm",
                  selectedAmount === amount 
                    ? "bg-primary text-white border-primary shadow-lg scale-105" 
                    : "bg-white text-primary border-transparent shadow-soft"
                )}
              >
                {amount} ₺
              </button>
            ))}
          </div>
          <Button className="w-full h-14 rounded-2xl bg-white border border-primary/20 text-primary hover:bg-primary/5 shadow-soft flex items-center justify-center gap-3 group">
            <CreditCard className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-bold">Kredi Kartı ile Yükle</span>
          </Button>
        </section>

        {/* QR Button Section */}
        <section>
          <button className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative w-full h-24 rounded-3xl bg-white border border-accent/20 flex items-center justify-between px-8 shadow-soft overflow-hidden active:scale-[0.98] transition-all">
              <div className="absolute inset-0 bg-accent/5 animate-pulse opacity-50"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <QrCode className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-black text-accent tracking-tight">QR Okut & Bin</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Hızlı Dijital Biniş</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:translate-x-1 transition-transform relative z-10">
                <ChevronRight className="h-6 w-6" />
              </div>
            </div>
          </button>
        </section>

        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Son Hareketler</h2>
            <button className="text-[10px] font-bold text-primary uppercase tracking-wider">Tümünü Gör</button>
          </div>
          <div className="space-y-3">
            {transactions.map((t) => (
              <Card key={t.id} className="border-none shadow-soft rounded-2xl bg-white overflow-hidden active:scale-[0.99] transition-transform">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      t.type === 'payment' ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"
                    )}>
                      {t.type === 'payment' ? <History className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{t.title}</p>
                      <p className="text-[10px] text-muted-foreground font-medium">{t.date}</p>
                    </div>
                  </div>
                  <p className={cn(
                    "font-bold text-sm",
                    t.type === 'payment' ? "text-foreground" : "text-green-600"
                  )}>{t.amount}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Info Box */}
        <section className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-primary">Dijital Gelecek</p>
            <p className="text-[10px] text-primary/70 leading-relaxed font-medium">
              Isparta Kart artık tamamen dijital! Fiziksel karta ihtiyaç duymadan NFC veya QR ile tüm toplu taşıma araçlarını kullanabilirsiniz.
            </p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
