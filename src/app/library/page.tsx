
"use client"

import { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/bottom-nav';

const libraries = [
  { id: 1, name: "Halil Hamit Paşa Kütüphanesi", address: "Kültür Merkezi", available: 45 },
  { id: 2, name: "İl Halk Kütüphanesi", address: "Merkez", available: 12 },
  { id: 3, name: "Üniversite Kütüphanesi (SDÜ)", address: "Batı Kampüsü", available: 89 },
];

const timeSlots = [
  "09:00 - 11:00", "11:00 - 13:00", "13:00 - 15:00", "15:00 - 17:00", "17:00 - 19:00", "19:00 - 21:00"
];

export default function LibraryPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedLibrary, setSelectedLibrary] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleBooking = () => {
    alert("Randevunuz başarıyla oluşturuldu!");
    window.location.href = "/dashboard";
  }

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary">Kütüphane Randevusu</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Kütüphane Seçiniz</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Kütüphane ara..." className="pl-10 rounded-xl" />
            </div>
            <div className="space-y-3">
              {libraries.map((lib) => (
                <Card 
                  key={lib.id} 
                  className={cn(
                    "cursor-pointer border transition-all rounded-xl",
                    selectedLibrary === lib.id ? "border-primary bg-primary/5" : "border-transparent"
                  )}
                  onClick={() => setSelectedLibrary(lib.id)}
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm">{lib.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {lib.address}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-primary">{lib.available} Masa</span>
                      <p className="text-[10px] text-muted-foreground">Boş</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button 
              className="w-full h-12 rounded-xl" 
              disabled={!selectedLibrary}
              onClick={() => setStep(2)}
            >
              Devam Et
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Tarih ve Saat Seçiniz</h2>
            <Card className="border-none shadow-soft rounded-xl overflow-hidden">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
              />
            </Card>

            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  className={cn(
                    "p-3 rounded-xl border text-sm font-medium transition-all",
                    selectedSlot === slot ? "bg-primary text-white border-primary" : "bg-white text-muted-foreground"
                  )}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setStep(1)}>Geri</Button>
              <Button 
                className="flex-[2] h-12 rounded-xl" 
                disabled={!selectedSlot}
                onClick={() => setStep(3)}
              >
                Devam Et
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Randevu Özeti</h2>
            <Card className="border-none shadow-soft rounded-xl bg-primary text-white p-6">
               <div className="space-y-6">
                 <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-1" />
                    <div>
                      <p className="text-white/60 text-xs">Kütüphane</p>
                      <p className="font-bold">{libraries.find(l => l.id === selectedLibrary)?.name}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <CalendarIcon className="h-5 w-5 mt-1" />
                    <div>
                      <p className="text-white/60 text-xs">Tarih</p>
                      <p className="font-bold">{selectedDate?.toLocaleDateString('tr-TR')}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-1" />
                    <div>
                      <p className="text-white/60 text-xs">Saat Aralığı</p>
                      <p className="font-bold">{selectedSlot}</p>
                    </div>
                 </div>
               </div>
            </Card>

            <div className="p-4 bg-secondary/50 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground text-center">
                Randevunuz onaylandıktan sonra karekodunuz oluşacaktır. Kütüphane girişinde okutmayı unutmayınız.
              </p>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setStep(2)}>Geri</Button>
              <Button className="flex-[2] h-12 rounded-xl bg-accent hover:bg-accent/90" onClick={handleBooking}>Onayla</Button>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
