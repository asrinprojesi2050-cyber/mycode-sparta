
"use client"

import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Users, Utensils, Navigation, Info, X, Check, Sparkles, QrCode, Coffee, ArrowUpRight, Timer, Flag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/bottom-nav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const facilities = [
  {
    id: 1,
    name: "Kirazlıdere Sosyal Tesisleri",
    address: "Kirazlıdere Mevkii, Isparta",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    occupancy: 65,
    emptyTables: 12,
    shortDesc: "Şehrin Zirvesinde, Cam Teras Manzaralı Akşam Yemeği",
    description: "Isparta'nın en yüksek noktasında, cam terasın heyecanıyla şehrin panoramik ışıkları altında meşhur serpme kahvaltımızın veya akşam yemeğimizin tadını çıkarın.",
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
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    occupancy: 82,
    emptyTables: 5,
    shortDesc: "Doğa ile İç İçe, Göl Kenarında Huzurlu Bir Mola",
    description: "Doğa ile iç içe, kuş sesleri ve gölet manzarası eşliğinde geleneksel Isparta mutfağının en seçkin örneklerini keşfedin. Çocuklar için güvenli oyun alanları mevcuttur.",
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
    name: "Etnografya Müzesi Yanı Tesis",
    address: "Yedişehitler, Isparta",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    occupancy: 40,
    emptyTables: 24,
    shortDesc: "Tarihin Gölgesinde, Güllerle Süslü Bahçede Kafe Keyfi",
    description: "Isparta Etnografya Müzesi'nin tarihi dokusunun hemen yanında, güllerle süslü bahçemizde günün yorgunluğunu en taze içeceklerimizle atın.",
    mapsUrl: "https://www.google.com/maps/search/Etnografya+Müzesi+Sosyal+Tesisleri+Isparta",
    menu: [
      { name: "Yeni Nesil Türk Kahvesi", price: "65 ₺", icon: Coffee, desc: "Közde ağır pişmiş, lokum eşliğinde servis." },
      { name: "Müze Tabağı", price: "175 ₺", icon: Utensils, desc: "Tarihi dokuya uygun yerel atıştırmalıklar." },
      { name: "Gül Şerbeti", price: "55 ₺", icon: Sparkles, desc: "Tamamen doğal gül yapraklarından soğuk içecek." },
      { name: "Sıcak Çikolata", price: "80 ₺", icon: Coffee, desc: "Belçika çikolatası ile hazırlanan yoğun lezzet." }
    ]
  }
];

export default function FacilitiesPage() {
  const [selectedFacility, setSelectedFacility] = useState<typeof facilities[0] | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navTarget, setNavTarget] = useState<typeof facilities[0] | null>(null);

  const startNavigation = (facility: typeof facilities[0]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(100);
    }
    setNavTarget(facility);
    setIsNavigating(true);
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setNavTarget(null);
  };

  if (isNavigating && navTarget) {
    return (
      <div className="fixed inset-0 z-[100] bg-zinc-900 animate-in fade-in duration-500 flex flex-col overflow-hidden">
        {/* Top Direction Band */}
        <div className="bg-zinc-800 p-6 pt-12 text-white shadow-2xl relative z-10 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ArrowUpRight className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black tracking-tight leading-none">300m</p>
              <p className="text-sm font-bold text-blue-400 uppercase tracking-widest">Sağa Dönün</p>
              <p className="text-zinc-400 font-medium text-sm">{navTarget.name} Yolu</p>
            </div>
          </div>
        </div>

        {/* Simulated Map View */}
        <div className="flex-1 relative bg-zinc-900 overflow-hidden">
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Simulated Route */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M 50 100 L 50 60 L 80 60 L 80 20" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              className="opacity-80"
            />
          </svg>

          {/* User Icon (Moving Arrow) */}
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 animate-[nav-move_10s_linear_infinite]">
             <div className="relative">
                <div className="w-12 h-12 bg-blue-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center rotate-[-15deg]">
                   <Navigation className="h-6 w-6 text-white fill-white" />
                </div>
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
             </div>
          </div>

          {/* Destination Marker */}
          <div className="absolute top-[20%] right-[20%]">
             <div className="flex flex-col items-center">
                <div className="bg-white px-3 py-1.5 rounded-xl shadow-2xl border border-zinc-200 mb-2">
                   <p className="text-[10px] font-black text-zinc-900 uppercase tracking-tight">{navTarget.name}</p>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                   <Flag className="h-5 w-5 text-white" />
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Info Panel */}
        <div className="bg-zinc-800 p-8 pb-12 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative z-10 border-t border-white/5">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                       <Timer className="h-4 w-4" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kalan Süre</span>
                    </div>
                    <p className="text-3xl font-black text-white leading-none">12 <span className="text-sm font-bold text-zinc-500">dk</span></p>
                 </div>
                 <div className="w-px h-10 bg-zinc-700 mx-2" />
                 <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Mesafe</p>
                    <p className="text-xl font-bold text-white leading-none">4.2 <span className="text-xs text-zinc-500">km</span></p>
                 </div>
              </div>

              <button 
                onClick={stopNavigation}
                className="w-16 h-16 bg-red-500 rounded-3xl flex items-center justify-center shadow-xl shadow-red-500/20 active:scale-90 transition-transform"
              >
                 <X className="h-8 w-8 text-white font-black" />
              </button>
           </div>
           
           <div className="mt-8 flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-[0.25em]">
              <p>Varış: 19:45</p>
              <p className="text-blue-500">En Hızlı Rota</p>
           </div>
        </div>

        <style jsx>{`
          @keyframes nav-move {
            0% { transform: translate(-50%, 0) rotate(-15deg); }
            50% { transform: translate(-50%, -100px) rotate(0deg); }
            100% { transform: translate(-50%, -200px) rotate(15deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF9]">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Sosyal Tesisler</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-6 max-w-2xl mx-auto">
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
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image Section */}
                  <div className="relative w-full sm:w-2/5 h-64 sm:min-h-full overflow-hidden">
                    <Image 
                      src={facility.image} 
                      alt={facility.name}
                      fill
                      className="object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none transition-transform duration-500 hover:scale-105"
                    />
                    {/* Elit Rozet */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black text-primary flex items-center gap-2 shadow-lg border border-white/40">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <Utensils className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="uppercase tracking-widest">Sosyal Tesis</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-foreground mb-1 tracking-tight leading-tight">{facility.name}</h3>
                      <p className="text-[11px] text-primary font-black uppercase tracking-[0.15em] mb-3 leading-relaxed">
                        {facility.shortDesc}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter mb-4">
                        <MapPin className="h-3.5 w-3.5 text-primary/40" /> {facility.address}
                      </div>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed font-medium">
                        {facility.description}
                      </p>
                    </div>

                    {/* Occupancy Indicator */}
                    <div className="space-y-3 pt-4 border-t border-border/50">
                      <div className="flex justify-between items-center text-[11px] font-black">
                        <div className="flex items-center gap-1.5 text-primary uppercase tracking-[0.1em]">
                          <Users className="h-4 w-4" />
                          <span>Güncel Durum</span>
                        </div>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] shadow-sm",
                          facility.occupancy > 80 ? "bg-red-50 text-red-600 border border-red-100" : facility.occupancy > 50 ? "bg-accent/5 text-accent border border-accent/10" : "bg-green-50 text-green-600 border border-green-100"
                        )}>
                          %{facility.occupancy} DOLU
                        </span>
                      </div>
                      <Progress 
                        value={facility.occupancy} 
                        className="h-2.5 bg-secondary/50"
                      />
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-bold text-muted-foreground/50 italic uppercase tracking-widest">
                          Masa Kapasitesi: 20
                        </p>
                        <p className="text-[10px] font-black text-primary italic bg-primary/5 px-2 py-0.5 rounded-md">
                          {facility.emptyTables} BOŞ MASA MEVCUT
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        className="h-12 rounded-xl border-primary/20 text-primary hover:bg-primary/5 text-xs font-black uppercase tracking-widest shadow-sm transition-all active:scale-95"
                        onClick={() => setSelectedFacility(facility)}
                      >
                        Menüyü Gör
                      </Button>
                      <Button 
                        className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95 gap-2"
                        onClick={() => startNavigation(facility)}
                      >
                        <Navigation className="h-4 w-4" /> Yol Tarifi
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
          <div className="relative h-48 w-full shrink-0">
            {selectedFacility && (
              <Image 
                src={selectedFacility.image} 
                alt={selectedFacility.name}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF9] via-transparent to-black/30" />
            <button 
              onClick={() => setSelectedFacility(null)}
              className="absolute top-6 right-6 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-foreground shadow-xl active:scale-90 transition-transform"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-8 space-y-6 -mt-10 relative z-10 bg-[#FDFBF9] rounded-t-[2.5rem]">
            <DialogHeader>
              <div className="flex justify-center mb-3">
                 <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">Dijital Menü</div>
              </div>
              <DialogTitle className="text-center text-3xl font-black text-primary tracking-tight">
                {selectedFacility?.name}
              </DialogTitle>
              <DialogDescription className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">
                Geleneksel Isparta Lezzetleri
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-[40vh] overflow-y-auto px-1 pr-2 scrollbar-hide">
              {selectedFacility?.menu.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-white rounded-3xl shadow-soft border border-border/30 group hover:border-primary/20 transition-all active:scale-[0.98]">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-foreground leading-tight">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium leading-relaxed line-clamp-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-primary tracking-tighter">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border/50">
               <div className="bg-reward/5 border border-reward/20 rounded-2xl p-4 mb-5 flex items-center justify-between animate-pulse-subtle">
                  <div className="flex items-center gap-3">
                     <div className="w-9 h-9 rounded-xl bg-reward/10 flex items-center justify-center text-reward shadow-sm">
                        <Sparkles className="h-5 w-5" />
                     </div>
                     <p className="text-[11px] font-black text-reward uppercase tracking-tight">Burada Gül Puan Geçerlidir</p>
                  </div>
                  <Check className="h-4 w-4 text-reward" />
               </div>

               <Button className="w-full h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-base shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95 group">
                  <QrCode className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                  QR ile Hızlı Ödeme
               </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
