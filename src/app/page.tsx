
"use client"

import Link from 'next/link';
import { ArrowRight, Sparkles, Navigation, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FDFBF9] overflow-hidden p-8">
      {/* Brand Identity - Minimalist Logo */}
      <div className="mb-12 animate-fade-in">
        <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl border border-primary/10 mx-auto">
          <span className="text-primary font-black text-4xl">M</span>
        </div>
      </div>

      {/* Content Section - "Hoş Geldiniz" Vision */}
      <div className="max-w-sm w-full text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10 mx-auto">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Akıllı Şehir Portalı</span>
        </div>
        
        <h1 className="text-4xl font-black text-primary tracking-tight leading-[1.1]">
          Isparta Şehir Asistanı&apos;na Hoş Geldiniz
        </h1>
        
        <p className="text-base text-muted-foreground font-medium leading-relaxed">
          Isparta&apos;yı parmaklarınızın ucunda keşfedin. Şehrin dijital dünyasına hızlı ve güvenli bir adım atın.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 space-y-4">
          <Button asChild size="lg" className="w-full rounded-2xl h-16 bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-lg font-bold group">
            <Link href="/dashboard" className="flex items-center justify-center gap-3">
              Hizmetleri Keşfet
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Feature Badges */}
          <div className="flex items-center justify-center gap-8 pt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white rounded-xl shadow-soft text-primary border border-primary/5">
                <Navigation className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Navigasyon</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white rounded-xl shadow-soft text-primary border border-primary/5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Güvenli</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white rounded-xl shadow-soft text-primary border border-primary/5">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Yapay Zeka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding - Fixed at bottom */}
      <div className="absolute bottom-8 left-0 right-0 text-center space-y-1">
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">
          Isparta Belediyesi
        </p>
        <p className="text-[9px] text-primary/40 font-bold uppercase tracking-wider">
          Dijital Dönüşüm Ofisi • 2024
        </p>
      </div>
    </main>
  );
}
