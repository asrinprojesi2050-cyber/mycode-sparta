
"use client"

import { useState } from 'react';
import { ArrowLeft, MapPin, Users, Utensils, Navigation, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/bottom-nav';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const facilities = [
  {
    id: 1,
    name: "Kirazlıdere Sosyal Tesisleri",
    address: "Kirazlıdere Mevkii, Isparta",
    image: PlaceHolderImages.find(img => img.id === 'facility-kirazlidere')?.imageUrl,
    occupancy: 65,
    emptyTables: 12,
    description: "Isparta'nın en yüksek noktasında, şehrin eşsiz manzarasını tadabileceğiniz modern restoranımız.",
    mapsUrl: "https://www.google.com/maps/search/Kirazlıdere+Sosyal+Tesisleri+Isparta"
  },
  {
    id: 2,
    name: "Gökçay Restoran",
    address: "Gökçay Mesire Alanı, Isparta",
    image: PlaceHolderImages.find(img => img.id === 'facility-gokcay')?.imageUrl,
    occupancy: 82,
    emptyTables: 5,
    description: "Doğayla iç içe, yemyeşil bir ortamda geleneksel lezzetlerin buluşma noktası.",
    mapsUrl: "https://www.google.com/maps/search/Gökçay+Sosyal+Tesisleri+Isparta"
  },
  {
    id: 3,
    name: "Seyir Terası Sosyal Tesisi",
    address: "Yedişehitler, Isparta",
    image: PlaceHolderImages.find(img => img.id === 'facility-seyir')?.imageUrl,
    occupancy: 40,
    emptyTables: 24,
    description: "Şehrin kalbinde, panoramik Isparta manzarası eşliğinde kahvenizi yudumlayın.",
    mapsUrl: "https://www.google.com/maps/search/Seyir+Terası+Sosyal+Tesisleri+Isparta"
  }
];

export default function FacilitiesPage() {
  const handleOpenMaps = (url: string) => {
    window.open(url, '_blank');
  };

  const handleShowMenu = (name: string) => {
    alert(`${name} menüsü yükleniyor...`);
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
                  <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
                    <Image 
                      src={facility.image || "https://picsum.photos/seed/facility/600/600"} 
                      alt={facility.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary flex items-center gap-1 shadow-sm">
                      <Utensils className="h-3 w-3" /> Restoran
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{facility.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                        <MapPin className="h-3 w-3" /> {facility.address}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {facility.description}
                    </p>

                    {/* Occupancy Indicator */}
                    <div className="space-y-2 pt-2 border-t border-border/50">
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
                      <p className="text-[10px] font-bold text-muted-foreground text-right italic">
                        Şu an <span className="text-primary">{facility.emptyTables} Boş Masa</span> mevcut.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        className="h-10 rounded-xl border-primary/20 text-primary hover:bg-primary/5 text-xs font-bold gap-2"
                        onClick={() => handleShowMenu(facility.name)}
                      >
                        <Utensils className="h-3.5 w-3.5" /> Menüyü Gör
                      </Button>
                      <Button 
                        className="h-10 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-2 shadow-md"
                        onClick={() => handleOpenMaps(facility.mapsUrl)}
                      >
                        <Navigation className="h-3.5 w-3.5" /> Yol Tarifi Al
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
