
"use client"

import { ArrowLeft, History, Plus, Bus, Wallet, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';

const allTransactions = [
  { id: 1, title: "Halk Otobüsü - Hat 18", date: "24 Nisan 2024", time: "08:45", amount: "-15.00 ₺", type: "payment" },
  { id: 2, title: "Bakiye Yükleme", date: "23 Nisan 2024", time: "14:20", amount: "+100.00 ₺", type: "topup" },
  { id: 3, title: "Halk Otobüsü - Hat 4", date: "22 Nisan 2024", time: "17:30", amount: "-15.00 ₺", type: "payment" },
  { id: 4, title: "Bakiye Yükleme", date: "20 Nisan 2024", time: "10:15", amount: "+50.00 ₺", type: "topup" },
  { id: 5, title: "Halk Otobüsü - Hat 10", date: "19 Nisan 2024", time: "19:10", amount: "-15.00 ₺", type: "payment" },
  { id: 6, title: "Halk Otobüsü - Hat 22", date: "18 Nisan 2024", time: "07:50", amount: "-15.00 ₺", type: "payment" },
  { id: 7, title: "Bakiye Yükleme", date: "15 Nisan 2024", time: "16:00", amount: "+200.00 ₺", type: "topup" },
  { id: 8, title: "Halk Otobüsü - Hat 1", date: "14 Nisan 2024", time: "11:20", amount: "-15.00 ₺", type: "payment" },
];

export default function TransactionHistoryPage() {
  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF9]">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/isparta-kart" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Tüm Hareketler</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-6 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="İşlemlerde ara..." className="pl-10 rounded-xl bg-white border-none shadow-soft h-11" />
        </div>

        <div className="space-y-1">
          {allTransactions.map((t, index) => (
            <div key={t.id} className="group">
              <div className="flex items-center justify-between p-4 bg-transparent hover:bg-white/50 transition-colors cursor-pointer rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95",
                    t.type === 'payment' ? "bg-red-50 text-[#8D3B4A]" : "bg-green-50 text-green-600"
                  )}>
                    {t.type === 'payment' ? <Bus className="h-6 w-6" /> : <Wallet className="h-6 w-6" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.title}</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                      {t.date} • {t.time}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <p className={cn(
                    "font-bold text-sm",
                    t.type === 'payment' ? "text-[#8D3B4A]" : "text-green-600"
                  )}>
                    {t.amount}
                  </p>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/20" />
                </div>
              </div>
              {index < allTransactions.length - 1 && (
                <div className="mx-4 h-[1px] bg-border/30" />
              )}
            </div>
          ))}
        </div>

        {allTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground opacity-50">
            <History className="h-12 w-12 mb-4" />
            <p className="text-sm font-medium">Henüz bir işlem kaydı bulunmuyor.</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
