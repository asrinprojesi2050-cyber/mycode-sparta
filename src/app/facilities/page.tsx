
"use client"

import { useState } from 'react';
import { ArrowLeft, MapPin, Users, Utensils, Navigation, Info, ExternalLink, Coffee, Sparkles, QrCode, X, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/bottom-nav';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const facilities = [
  {
    id: 1,
    name: "Kirazlıdere Sosyal Tesisleri",
    address: "Kirazlıdere Mevkii, Isparta",
    image: PlaceHolderImages.find(img => img.id === 'facility-kirazlidere')?.imageUrl,
    occupancy: 65,
    emptyTables: 12,
    description: "Şehrin en yüksek noktasında, Isparta ayaklarınızın altındayken meşhur serpme kahvaltımızın tadını çıkarın. Ailenizle akşam yemeği için en ferah tercih.",
    mapsUrl: "https://www.google.com/maps/search/Kirazlıdere+Sosyal+Tesisleri+Isparta",
    menu: [
      { name: "Meşhur Kabune Pilavı", price: "185 ₺", icon: Utensils, desc: "Geleneksel usulle ağır ateşte pişmiş etli pilav." },
      { name: "Serpme Köy Kahvaltısı", price: "240 ₺", icon: Coffee, desc: "Kirazlıdere manzarası eşliğinde 24 çeşit lezzet." },
      { name: "Isparta Şiş", price: "260 ₺", icon: Utensils, desc: "Özel sosuyla harmanlanmış kuzu şiş." },
      { name: "Gül Reçelli Sütlü Tatlı", price: "95 ₺", icon: Sparkles, desc: "Isparta'nın taze gülleriyle hazırlanan hafif tatlı." }
    ]
  },
  {
    id: 2,
    name: "Gökçay Restoran",
    address: "Gökçay Mesire Alanı, Isparta",
    image: PlaceHolderImages.find(img => img.id === 'facility-gokcay')?.imageUrl,
    occupancy: 82,
    emptyTables: 5,
    description: "Doğa ile iç içe, kuş sesleri eşliğinde geleneksel Isparta mutfağının en seçkin örneklerini keşfedin. Çocuk oyun alanlarıyla tam bir aile dostu mekan.",
    mapsUrl: "https://www.google.com/maps/search/Gökçay+Sosyal+Tesisleri+Isparta",
    menu: [
      { name: "Fırın Kebabı", price: "290 ₺", icon: Utensils, desc: "12 saat taş fırında pişen meşhur Isparta kebabı." },
      { name: "Gül Reçelli Kahvaltı", price: "190 ₺", icon: Coffee, desc: "Doğanın içinde taze ve doğal ürünlerle kahvaltı." },
      { name: "Peynir Helvası", price: "85 ₺", icon: Sparkles, desc: "Sıcak servis edilen yöresel peynir tatlısı." },
      { name: "Yayık Ayranı", price: "35 ₺", icon: Utensils, desc: "Bol köpüklü taze yayık ayranı." }
    ]
  },
  {
    id: 3,
    name: "Seyir Terası Sosyal Tesisi",
    address: "Yedişehitler, Isparta",
    image: PlaceHolderImages.find(img => img.id === 'facility-seyir')?.imageUrl,
    occupancy: 40,
    emptyTables: 24,
    description: "Gün batımını izlerken kahvenizi yudumlayabileceğiniz, Isparta'nın yeni nesil buluşma noktası. Panoramik manzara ve huzur bir arada.",
    mapsUrl: "https://www.google.com/maps/search/Seyir+Terası+Sosyal+Tesisleri+Isparta",
    menu: [
      { name: "Yeni Nesil Türk Kahvesi", price: "65 ₺", icon: Coffee, desc: "Közde ağır pişmiş, lokum eşliğinde servis." },
      { name: "Manzara Tabağı", price: "175 ₺", icon: Utensils, desc: "Atıştırmalık ve peynir çeşitlerinden oluşan özel tabak." },
      { name: "Gül Şerbeti", price: "55 ₺", icon: Sparkles, desc: "Tamamen doğal gül yapraklarından soğuk içecek." },
      { name: "Sıcak Çikolata", price: "80 ₺", icon: Coffee, desc: "Belçika çikolatası ile hazırlanan yoğun lezzet." }
    ]
  }
];

export default function FacilitiesPage() {
  const [selectedFacility, setSelectedFacility] = useState<typeof facilities[0] | null>(null);

  const handleOpenMaps = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF9]">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Sosyal Tesisler</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-6">
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary shrink-0" />
          <p className="text-xs text-primary/80 leading-relaxed font-medium">
            Belediye tesislerimizin doluluk oranlarını canlı takip edebilir, gitmeden önce yerinizi planlayabilirsiniz.
          </p>
        </div>

        <div className="space-y-6">
          {facilities.map((facility) => (
            <Card key={facility.id} className="border-none shadow-soft rounded-2xl overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Image Section */}
                  <div className="relative w-full sm:w-1/3 h-52 sm:h-auto">
                    <Image 
                      src={facility.image || "https://picsum.photos/seed/facility/600/600"} 
                      alt={facility.name}
                      fill
                      className="object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary flex items-center gap-1 shadow-sm">
                      <Utensils className="h-3 w-3" /> Restoran
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">{facility.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                        <MapPin className="h-3 w-3" /> {facility.address}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {facility.description}
                    </p>

                    {/* Occupancy Indicator */}
                    <div className="space-y-2 pt-4 border-t border-border/50">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <div className="flex items-center gap-1.5 text-primary">
                          <Users className="h-3.5 w-3.5" />
                          <span>Doluluk Oranı</span>
                        </div>
                        <span className={cn(
                          facility.occupancy > 80 ? "text-red-500" : facility.occupancy > 50 ? "text-accent" : "text-green-600"
                        )}>
                          %{facility.occupancy} Dolu
                        </span>
                      </div>
                      <Progress 
                        value={facility.occupancy} 
                        className="h-2 bg-secondary"
                      />
                      <div className="flex justify-end pt-1">
                        <p className="text-[10px] font-bold text-muted-foreground italic">
                          Şu an <span className="text-primary">{facility.emptyTables} Boş Masa</span> mevcut.
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        className="h-11 rounded-xl border-primary/20 text-primary hover:bg-primary/5 text-xs font-bold gap-2 shadow-sm"
                        onClick={() => setSelectedFacility(facility)}
                      >
                        <Utensils className="h-4 w-4" /> Menüyü Gör
                      </Button>
                      <Button 
                        className="h-11 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-2 shadow-md transition-transform active:scale-95"
                        onClick={() => handleOpenMaps(facility.mapsUrl)}
                      >
                        <Navigation className="h-4 w-4" /> Yol Tarifi Al
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Digital Menu Modal */}
      <Dialog open={!!selectedFacility} onOpenChange={(open) => !open && setSelectedFacility(null)}>
        <DialogContent className="max-w-[90vw] sm:max-w-md rounded-[2.5rem] p-0 overflow-hidden border-none bg-[#FDFBF9] shadow-2xl">
          <div className="relative h-40 w-full shrink-0">
            {selectedFacility && (
              <Image 
                src={selectedFacility.image || "https://picsum.photos/seed/facility/600/600"} 
                alt={selectedFacility.name}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF9] via-transparent to-black/20" />
            <button 
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-foreground shadow-lg active:scale-90 transition-transform"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-8 space-y-6 -mt-8 relative z-10 bg-[#FDFBF9] rounded-t-[2.5rem]">
            <DialogHeader>
              <div className="flex justify-center mb-2">
                 <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">Dijital Menü</div>
              </div>
              <DialogTitle className="text-center text-2xl font-black text-primary tracking-tight">
                {selectedFacility?.name}
              </DialogTitle>
              <DialogDescription className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Yöresel Lezzetler & Tatlar
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-[45vh] overflow-y-auto px-1 pr-2 scrollbar-hide">
              {selectedFacility?.menu.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-soft border border-border/30 group hover:border-primary/20 transition-all active:scale-[0.98]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-foreground leading-tight">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-primary">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border/50">
               <div className="bg-reward/5 border border-reward/20 rounded-2xl p-4 mb-4 flex items-center justify-between animate-pulse-subtle">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-reward/10 flex items-center justify-center text-reward">
                        <Sparkles className="h-4 w-4" />
                     </div>
                     <p className="text-[11px] font-bold text-reward uppercase tracking-tight">Burada Gül Puan Geçerlidir</p>
                  </div>
                  <Check className="h-4 w-4 text-reward" />
               </div>

               <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95">
                  <QrCode className="h-5 w-5" />
                  QR ile Ödeme Yap
               </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
