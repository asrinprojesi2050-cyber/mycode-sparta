
"use client"

import { useState } from 'react';
import { ArrowLeft, CreditCard, Receipt, CheckCircle2, Plus, ChevronRight, Droplets, Wallet, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';

const pastBills = [
  { id: 101, type: 'Su', date: '15 Mayıs 2024', amount: '85.20 ₺', status: 'Ödendi' },
  { id: 102, type: 'Su', date: '12 Nisan 2024', amount: '92.40 ₺', status: 'Ödendi' },
  { id: 103, type: 'Su', date: '10 Mart 2024', amount: '78.50 ₺', status: 'Ödendi' },
];

export default function PaymentsPage() {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Mimic processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsPayModalOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Fatura Ödeme</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-8">
        {/* Active Bill Card */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Aktif Faturalar</h2>
          <Card className="border-none shadow-soft rounded-2xl overflow-hidden bg-white ring-1 ring-primary/5">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Droplets size={80} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-white/90">Isparta Belediyesi</span>
                  </div>
                  <h3 className="text-lg font-bold mb-6">Su ve Atık Su Faturası</h3>
                  
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-white/70">Ödenmemiş Borç</p>
                      <p className="text-3xl font-bold">145.50 ₺</p>
                    </div>
                    <Button 
                      onClick={() => setIsPayModalOpen(true)}
                      className="bg-white text-primary hover:bg-white/90 rounded-xl px-6 h-11 font-bold shadow-lg"
                    >
                      Hemen Öde
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/10">
                <span className="flex items-center gap-1 font-medium"><Receipt className="h-3 w-3" /> Abone No: 24001234</span>
                <span className="font-medium">Son Ödeme: 25.06.2024</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Payment History */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Geçmiş Faturalarım</h2>
            <button className="text-xs font-bold text-primary">Tümünü Gör</button>
          </div>
          <div className="space-y-3">
            {pastBills.map((bill) => (
              <Card key={bill.id} className="border-none shadow-soft rounded-xl bg-white overflow-hidden group active:scale-[0.98] transition-transform">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary/60">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{bill.date}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">İşlem No: #{bill.id}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-sm font-bold text-foreground">{bill.amount}</p>
                      <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-green-600">
                        <CheckCircle2 className="h-3 w-3" /> {bill.status}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Add New Bill */}
        <section className="pt-4">
          <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-primary/30 text-primary hover:bg-primary/5 gap-2 border-2 group">
            <div className="p-1 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
              <Plus className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm">Yeni Fatura Tanımla (Abone No ile)</span>
          </Button>
        </section>
      </main>

      {/* Payment Confirmation Modal (Apple Pay Style) */}
      <Dialog open={isPayModalOpen} onOpenChange={setIsPayModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md rounded-t-3xl sm:rounded-3xl p-0 overflow-hidden border-none bg-[#FDFBF9]">
          <div className="p-6 space-y-8">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-primary">Ödemeyi Onayla</DialogTitle>
              <DialogDescription className="text-center text-xs text-muted-foreground">
                Isparta Belediyesi Su ve Atık Su Faturası
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-border/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">İşlem Tutarı</span>
                  <span className="text-xl font-bold">145.50 ₺</span>
                </div>
                <div className="h-px bg-border/50 w-full mb-4" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 bg-primary/10 rounded-md flex items-center justify-center border border-primary/20">
                      <Wallet className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">Isparta Kart</p>
                      <p className="text-[10px] text-muted-foreground">Bakiye: 145.50 ₺</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100 font-bold text-[9px]">YETERLİ</Badge>
                </div>
              </div>

              {/* Security Hint */}
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-medium">İşleminiz SSL ile güvenli bir şekilde korunmaktadır.</span>
              </div>
            </div>

            <DialogFooter className="flex-col gap-3">
              <Button 
                disabled={isProcessing || isSuccess}
                onClick={handlePayment}
                className={cn(
                  "w-full h-14 rounded-2xl text-lg font-bold shadow-xl transition-all relative overflow-hidden",
                  isSuccess ? "bg-green-600 hover:bg-green-600" : "bg-primary hover:bg-primary/90"
                )}
              >
                {isProcessing ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : isSuccess ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6" /> Ödendi
                  </div>
                ) : (
                  "Ödemeyi Onayla"
                )}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsPayModalOpen(false)}
                className="w-full text-muted-foreground font-medium"
              >
                Vazgeç
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
