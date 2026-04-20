
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WelcomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-rose');

  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/isparta/1200/800"}
          alt="Isparta"
          fill
          className="object-cover"
          priority
          data-ai-hint="rose field"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 text-center flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-8">
           <span className="text-primary font-bold text-4xl">M</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-white mb-4 tracking-tight">
          MyCode City
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-md font-light">
          Isparta'nın dijital dünyasına hoş geldiniz. Akıllı şehir çözümleriyle hayatınızı kolaylaştırın.
        </p>

        <Button asChild size="lg" className="rounded-xl px-12 h-14 bg-white text-primary hover:bg-white/90 shadow-xl transition-all hover:scale-105 active:scale-95 text-lg font-semibold group">
          <Link href="/dashboard" className="flex items-center gap-2">
            Hizmetlere Göz At
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-0 right-0 z-10 text-center text-white/60 text-sm font-medium">
        Isparta Belediyesi Akıllı Şehir Uygulaması
      </div>
    </main>
  );
}
