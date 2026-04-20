
"use client"

import { useState } from 'react';
import { ArrowLeft, CreditCard, Receipt, CheckCircle2, Plus, ChevronRight, Droplets, Wallet, ShieldCheck, Loader2, Sparkles, Flame, Zap, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'water', label: 'Su', provider: 'Isparta Belediyesi', icon: Droplets, color: 'text-blue-500' },
  { id: 'gas', label: 'Doğalgaz', provider: 'Torosgaz', icon: Flame, color: 'text-orange-500' },
  { id: 'electric', label: 'Elektrik', provider: 'CK Akdeniz', icon: Zap, color: 'text-yellow-500' },
];

const billsData: Record<string, any[]> = {
  water: [
    { id: 24001, title: 'Haziran 2024 Faturası', dueDate: '25.06.2024', amount: '145.50 ₺', provider: 'Isparta Belediyesi' },
  ],
  gas: [
    { id: 35001, title: 'Nisan Ayı Faturası', dueDate: '24.04.2024', amount: '450.00 ₺', provider: 'Torosgaz' },
    { id: 35002, title: 'Mayıs Ayı Faturası', dueDate: '22.05.2024', amount: '210.25 ₺', provider: 'Torosgaz' },
  ],
  electric: [
    { id: 46001, title: 'Dönem Faturası', dueDate: '20.06.2024', amount: '385.40 ₺', provider: 'CK Akdeniz' },
  ]
};

const pastBills = [
  { id: 101, type: 'Su', date: '15 Mayıs 2024', amount: '85.20 ₺', status: 'Ödendi' },
  { id: 102, type: 'Gaz', date: '12 Nisan 2024', amount: '320.40 ₺', status: 'Ödendi' },
];

export default function PaymentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('water');
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenPayment = (bill: any) => {
    setSelectedBill(bill);
    setIsPayModalOpen(true);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsPayModalOpen(false);
        setSelectedBill(null);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF9]">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Fatura Ödeme</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-8">
        {/* Categories Grid */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Kategoriler</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-2xl bg-white transition-all border-2",
                    isActive 
                      ? "border-primary shadow-lg ring-1 ring-primary/20 scale-[1.02]" 
                      : "border-transparent shadow-soft opacity-70 grayscale-[30%]"
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <Icon className={cn("h-6 w-6", cat.color)} />
                  </div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-tighter mb-1">{cat.label}</span>
                  <span className="text-[8px] text-muted-foreground font-medium text-center leading-tight">{cat.provider}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Dynamic Bill List */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ödenmemiş Borçlar</h2>
            <Badge variant="outline" className="text-[10px] font-bold text-primary border-primary/20">
              {billsData[selectedCategory].length} Fatura
            </Badge>
          </div>
          
          <div className="space-y-4">
            {billsData[selectedCategory].length > 0 ? (
              billsData[selectedCategory].map((bill) => (
                <Card key={bill.id} className="border-none shadow-soft rounded-2xl overflow-hidden bg-white group transition-all">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                          {selectedCategory === 'water' && <Droplets className="h-5 w-5 text-blue-500" />}
                          {selectedCategory === 'gas' && <Flame className="h-5 w-5 text-orange-500" />}
                          {selectedCategory === 'electric' && <Zap className="h-5 w-5 text-yellow-500" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm leading-tight">{bill.title}</h3>
                          <p className="text-[10px] text-muted-foreground font-medium uppercase">{bill.provider}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{bill.amount}</p>
                        <p className="text-[9px] font-bold text-red-500 uppercase">Son: {bill.dueDate}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleOpenPayment(bill)}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-xl shadow-md transition-transform active:scale-95"
                    >
                      Hızlı Öde
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 opacity-40">
                <Receipt className="h-12 w-12" />
                <p className="text-sm font-medium">Bu kategori için ödenmemiş borç bulunamadı.</p>
              </div>
            )}
          </div>
        </section>

        {/* Payment History */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Geçmiş Faturalarım</h2>
            <button className="text-xs font-bold text-primary">Tümünü Gör</button>
          </div>
          <div className="space-y-3">
            {pastBills.map((bill) => (
              <Card key={bill.id} className="border-none shadow-soft rounded-xl bg-white overflow-hidden active:scale-[0.98] transition-transform">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary/60">
                      {bill.type === 'Su' ? <Droplets className="h-5 w-5" /> : <Flame className="h-5 w-5" />}
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
                    <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Add New Bill */}
        <section className="pt-4 pb-8">
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
              <DialogTitle className="text-center text-xl font-bold text-primary">
                {isSuccess ? "Ödeme Başarılı" : "Ödemeyi Onayla"}
              </DialogTitle>
              <DialogDescription className="text-center text-xs text-muted-foreground">
                {selectedBill?.provider} {selectedBill?.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-4 space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium">İşleminiz başarıyla tamamlandı.</p>
                    <div className="bg-reward/10 border border-reward/20 rounded-xl p-4 flex flex-col items-center gap-2">
                       <div className="flex items-center gap-2 text-reward font-bold text-xs uppercase tracking-wider">
                         <Sparkles className="h-4 w-4" /> Tebrikler!
                       </div>
                       <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                        Bu ödemeden <span className="text-reward font-bold">50 Gül Puan</span> kazandın. Isparta için yaptığın katkıdan dolayı teşekkür ederiz.
                       </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-2xl p-6 shadow-soft border border-border/50">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">İşlem Tutarı</span>
                      <span className="text-xl font-bold">{selectedBill?.amount}</span>
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

                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-medium">İşleminiz SSL ile güvenli bir şekilde korunmaktadır.</span>
                  </div>
                </>
              )}
            </div>

            <DialogFooter className="flex-col gap-3">
              {!isSuccess && (
                <>
                  <Button 
                    disabled={isProcessing}
                    onClick={handlePayment}
                    className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl transition-all relative overflow-hidden bg-primary hover:bg-primary/90"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
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
                </>
              )}
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
