
import Link from 'next/link';
import { Library, Car, Bell, User, MapPin, Info, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';

export default function Dashboard() {
  const services = [
    {
      title: "Kütüphane Randevu",
      description: "Çalışma masanı hemen ayırt",
      icon: Library,
      href: "/library",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Otopark Doluluk",
      description: "Şehir genelindeki otoparkları izle",
      icon: Car,
      href: "/parking",
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Belediye Duyuruları",
      description: "Güncel haberler ve etkinlikler",
      icon: Bell,
      href: "/announcements",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="pb-24 md:pb-8">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">İyi günler,</h2>
          <h1 className="text-2xl font-bold text-primary">Merhaba Vatandaş</h1>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
          <User className="text-primary h-6 w-6" />
        </div>
      </header>

      <main className="px-6 space-y-8 animate-fade-in">
        {/* Featured Card */}
        <section>
          <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-white shadow-xl">
             <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
             <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4 backdrop-blur-md">Günün Önerisi</span>
                <h3 className="text-xl font-bold mb-2">Halil Hamit Paşa Kütüphanesi</h3>
                <p className="text-white/80 text-sm mb-6">Şu an 45 masa boş. Hemen yerini ayırt ve çalışmaya başla!</p>
                <Link href="/library" className="inline-flex items-center gap-2 text-sm font-semibold bg-white text-primary px-4 py-2 rounded-xl hover:bg-white/90 transition-colors">
                  Randevu Al <ArrowRight className="h-4 w-4" />
                </Link>
             </div>
          </div>
        </section>

        {/* Services Grid */}
        <section>
          <div className="flex justify-between items-end mb-4">
             <h3 className="text-lg font-bold">Hizmetler</h3>
             <button className="text-sm font-semibold text-primary">Tümünü Gör</button>
          </div>
          <div className="grid gap-4">
            {services.map((service) => (
              <Link key={service.href} href={service.href}>
                <Card className="border-none shadow-soft rounded-xl hover:scale-[1.02] transition-transform active:scale-95 bg-white">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", service.color)}>
                      <service.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-base">{service.title}</h4>
                      <p className="text-xs text-muted-foreground">{service.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground/30" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-secondary/30 rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-primary h-5 w-5" />
            <h3 className="font-bold">Isparta Hakkında</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Isparta, Türkiye'nin güller şehri olarak bilinir. MyCode City ile bu güzel şehri dijital dönüşümün merkezine taşıyoruz.
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
