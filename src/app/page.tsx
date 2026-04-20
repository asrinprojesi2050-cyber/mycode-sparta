
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Navigation, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WelcomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-isparta-modern');

  return (
    <main className="min-h-screen w-full flex flex-col bg-[#FDFBF9] overflow-hidden">
      {/* Visual Header Section - Modern Identity */}
      <div className="relative h-[55vh] w-full shrink-0">
        <div className="absolute inset-0 z-0 rounded-b-[2.5rem] overflow-hidden shadow-2xl">
          <Image
            src={heroImage?.imageUrl || "https://www.isparta.bel.tr/resimler/kirazlidere_cam_teras_panoramik.jpg"}
            alt="Isparta Şehir Asistanı - Kirazlıdere Cam Teras"
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105"
            priority
            data-ai-hint="modern city"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Floating Logo Badge */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl border border-primary/10">
            <span className="text-primary font-black text-3xl">M</span>
          </div>
        </div>
      </div>

      {/* Content Section - "Hoş Geldiniz" Vision */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8 text-center animate-fade-in">
        <div className="space-y-4 max-w-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10 mb-2">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Akıllı Şehir Portalı</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight leading-[1.1]">
            Isparta Şehir Asistanı&apos;na Hoş Geldiniz
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
            Şehrin Zirvesinde, Cam Teras Manzaralı Bir Dijital Deneyim. Isparta&apos;yı parmaklarınızın ucunda keşfedin.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 w-full max-w-xs space-y-4">
          <Button asChild size="lg" className="w-full rounded-2xl h-14 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-base font-bold group">
            <Link href="/dashboard" className="flex items-center justify-center gap-3">
              Hizmetleri Keşfet
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Feature Badges */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex flex-col items-center gap-1">
              <div className="p-2 bg-white rounded-lg shadow-soft text-primary">
                <Navigation className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Navigasyon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-2 bg-white rounded-lg shadow-soft text-primary">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Güvenli</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-2 bg-white rounded-lg shadow-soft text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Yapay Zeka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pb-8 text-center space-y-1">
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
