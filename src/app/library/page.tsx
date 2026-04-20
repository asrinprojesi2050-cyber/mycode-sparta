
"use client"

import { useState, useMemo } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Search, CheckCircle2, Info, Users, Armchair } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';

const libraries = [
  { id: "1", name: "Halil Hamit Paşa Kütüphanesi", address: "Mimar Sinan Cd. No:24" },
  { id: "2", name: "İl Halk Kütüphanesi", address: "Kültür Sarayı Yanı" },
  { id: "3", name: "SDÜ Batı Yerleşkesi Kütüphanesi", address: "Üniversite Kampüsü" },
];

const timeSlots = [
  { label: "09:00 - 11:00", available: 12, total: 50, isFull: false },
  { label: "11:00 - 13:00", available: 0, total: 50, isFull: true },
  { label: "13:00 - 15:00", available: 5, total: 50, isFull: false },
  { label: "15:00 - 17:00", available: 2, total: 50, isFull: false },
  { label: "17:00 - 19:00", available: 24, total: 50, isFull: false },
  { label: "19:00 - 21:00", available: 40, total: 50, isFull: false },
];

// Mock desks for Kroki
const desks = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  status: Math.random() > 0.3 ? 'free' : 'occupied'
}));

export default function LibraryPage() {
  const [step, setStep] = useState(1);
  const [selectedLibraryId, setSelectedLibraryId] = useState<string>("1");
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>('today');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDesk, setSelectedDesk] = useState<number | null>(null);

  const selectedLibrary = useMemo(() => 
    libraries.find(l => l.id === selectedLibraryId), 
  [selectedLibraryId]);

  const handleFinish = () => {
    setStep(4);
  }

  return (
    <div className="pb-32 min-h-screen bg-[#FDFBF9]">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Kütüphane Randevusu</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-8 max-w-md mx-auto">
        
        {/* Progress Tracker */}
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              s <= step ? "bg-primary" : "bg-muted"
            )} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8">
            {/* Library Dropdown */}
            <section className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Kütüphane Seçin</label>
              <Select value={selectedLibraryId} onValueChange={setSelectedLibraryId}>
                <SelectTrigger className="w-full h-14 rounded-2xl bg-white border-none shadow-soft text-sm font-bold focus:ring-primary">
                  <SelectValue placeholder="Kütüphane seçiniz" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-xl">
                  {libraries.map((lib) => (
                    <SelectItem key={lib.id} value={lib.id} className="font-medium py-3">
                      {lib.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>

            {/* Date Tabs */}
            <section className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Tarih</label>
              <div className="flex gap-3 p-1.5 bg-white/40 backdrop-blur-sm rounded-2xl border border-border/50">
                <button
                  onClick={() => setSelectedDate('today')}
                  className={cn(
                    "flex-1 py-3.5 rounded-xl text-xs font-bold transition-all",
                    selectedDate === 'today' ? "bg-primary text-white shadow-lg scale-[1.02]" : "text-muted-foreground hover:bg-white/50"
                  )}
                >
                  Bugün
                </button>
                <button
                  onClick={() => setSelectedDate('tomorrow')}
                  className={cn(
                    "flex-1 py-3.5 rounded-xl text-xs font-bold transition-all",
                    selectedDate === 'tomorrow' ? "bg-primary text-white shadow-lg scale-[1.02]" : "text-muted-foreground hover:bg-white/50"
                  )}
                >
                  Yarın
                </button>
              </div>
            </section>

            {/* Time Slots */}
            <section className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Saat Aralığı</label>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.label}
                    disabled={slot.isFull}
                    onClick={() => setSelectedSlot(slot.label)}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all text-left relative overflow-hidden group active:scale-95",
                      selectedSlot === slot.label 
                        ? "bg-primary text-white border-primary shadow-lg" 
                        : slot.isFull 
                          ? "bg-secondary/40 border-transparent opacity-50 grayscale" 
                          : "bg-white border-transparent text-foreground shadow-soft"
                    )}
                  >
                    <p className="text-xs font-bold mb-1">{slot.label}</p>
                    <div className="flex items-center gap-1">
                      <Users className={cn("h-3 w-3", selectedSlot === slot.label ? "text-white/70" : "text-primary")} />
                      <span className={cn(
                        "text-[9px] font-bold uppercase",
                        selectedSlot === slot.label ? "text-white/80" : "text-muted-foreground"
                      )}>
                        {slot.isFull ? "Tamamen Dolu" : `${slot.available} Masa Boş`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Sticky Continue Button */}
            <div className="fixed bottom-24 left-6 right-6 z-40 md:relative md:bottom-0 md:left-0 md:right-0">
              <Button 
                disabled={!selectedSlot}
                onClick={() => setStep(2)}
                className="w-full h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-2xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Devam Et
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-primary">Masa Seçimi (Kroki)</h2>
              <p className="text-xs text-muted-foreground font-medium">{selectedLibrary?.name}</p>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white border border-border rounded-sm"></div> Boş
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted rounded-sm"></div> Dolu
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-sm"></div> Seçili
              </div>
            </div>

            {/* Kroki Grid */}
            <Card className="border-none bg-white shadow-soft rounded-[2.5rem] p-8">
              <div className="grid grid-cols-4 gap-4">
                {desks.map((desk) => (
                  <button
                    key={desk.id}
                    disabled={desk.status === 'occupied'}
                    onClick={() => setSelectedDesk(desk.id)}
                    className={cn(
                      "aspect-square rounded-xl flex items-center justify-center text-[10px] font-bold transition-all",
                      desk.status === 'occupied' 
                        ? "bg-secondary text-muted-foreground opacity-40" 
                        : selectedDesk === desk.id
                          ? "bg-primary text-white shadow-lg scale-110"
                          : "bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10"
                    )}
                  >
                    <Armchair className={cn("h-4 w-4", selectedDesk === desk.id ? "animate-pulse" : "")} />
                  </button>
                ))}
              </div>
              
              {/* Entrance Indicator */}
              <div className="mt-12 flex justify-center">
                <div className="px-6 py-2 bg-secondary/30 rounded-full border border-border text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  GİRİŞ
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-14 rounded-2xl border-primary/20 text-primary font-bold" onClick={() => setStep(1)}>Geri</Button>
              <Button 
                className="flex-[2] h-14 rounded-2xl bg-primary text-white font-bold shadow-xl" 
                disabled={!selectedDesk}
                onClick={() => setStep(3)}
              >
                Masayı Ayır
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <h2 className="text-xl font-bold text-center text-primary">Randevu Özeti</h2>
            
            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
              <CardContent className="p-8 space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Kütüphane</p>
                      <p className="font-bold text-lg leading-tight">{selectedLibrary?.name}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                          <CalendarIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Tarih</p>
                          <p className="font-bold text-sm">{selectedDate === 'today' ? 'Bugün' : 'Yarın'}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Saat</p>
                          <p className="font-bold text-sm">{selectedSlot}</p>
                        </div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                        <Armchair className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-bold">Masa No: <span className="text-lg text-accent">{selectedDesk}</span></p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100 font-bold px-3 py-1">ONAY BEKLİYOR</Badge>
                 </div>
              </CardContent>
            </Card>

            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <p className="text-[10px] text-primary/70 leading-relaxed font-bold uppercase tracking-wide">
                Girişte QR kodunuzu okutmanız gerekmektedir. Randevu saatinizden 15 dk sonra gelmezseniz randevunuz otomatik iptal edilir.
              </p>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-14 rounded-2xl border-primary/20 text-primary font-bold" onClick={() => setStep(2)}>Geri</Button>
              <Button className="flex-[2] h-14 rounded-2xl bg-accent hover:bg-accent/90 text-white font-bold shadow-xl" onClick={handleFinish}>Randevuyu Kesinleştir</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-500/20 rounded-full animate-ping"></div>
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl relative z-10">
                <CheckCircle2 className="h-14 w-14" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-foreground tracking-tight">Harika!</h2>
              <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Masanız Rezerve Edildi</p>
            </div>

            <Card className="w-full max-w-[280px] bg-white rounded-[2rem] p-6 shadow-xl border border-border/50 text-center">
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-4">Randevu Kodunuz</p>
              <p className="text-3xl font-mono font-black text-primary tracking-tighter mb-4">LIB-42K-92</p>
              <div className="bg-secondary/30 p-4 rounded-xl flex items-center justify-center">
                 <Armchair className="h-12 w-12 text-primary/40" />
              </div>
            </Card>

            <Button asChild className="w-full h-16 rounded-[2rem] bg-primary text-white font-bold shadow-xl">
              <Link href="/dashboard">Ana Sayfaya Dön</Link>
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
