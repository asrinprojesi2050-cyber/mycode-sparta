
"use client"

import { useState } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Receipt, 
  CheckCircle2, 
  Plus, 
  ChevronRight, 
  Droplets, 
  Wallet, 
  ShieldCheck, 
  Loader2, 
  Sparkles, 
  Flame, 
  Zap, 
  X,
  Wifi,
  Globe,
  Lock,
  CreditCard as CardIcon
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { id: 'water', label: 'Su', provider: 'Isparta Belediyesi', icon: Droplets, color: 'text-blue-500' },
  { id: 'gas', label: 'Doğalgaz', provider: 'Torosgaz', icon: Flame, color: 'text-orange-500' },
  { id: 'electric', label: 'Elektrik', provider: 'CK Akdeniz', icon: Zap, color: 'text-yellow-500' },
  { id: 'internet', label: 'İnternet', provider: 'Netİnternet / Türk Telekom', icon: Globe, color: 'text-purple-500' },
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
  ],
  internet: [
    { id: 57001, title: 'ADSL/Fiber Faturası', dueDate: '18.06.2024', amount: '299.90 ₺', provider: 'Netİnternet' },
  ]
};

const pastBills = [
  { id: 101, type: 'Su', date: '15 Mayıs 2024', amount: '85.20 ₺', status: 'Ödendi' },
  { id: 102, type: 'Gaz', date: '12 Nisan 2024', amount: '320.40 ₺', status: 'Ödendi' },
];

export default function PaymentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('water');
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isAddBillModalOpen, setIsAddBillModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [useDifferentCard, setUseDifferentCard] = useState(false);
  const { toast } = useToast();

  // Form states for new bill
  const [newBillCategory, setNewBillCategory] = useState('water');
  const [subscriberNo, setSubscriberNo] = useState('');
  const [billNickName, setBillNickName] = useState('');

  // Form states for different card
  const [tempCardData, setTempCardData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });

  const handleOpenPayment = (bill: any) => {
    setSelectedBill(bill);
    setUseDifferentCard(false);
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
        setTempCardData({ name: '', number: '', expiry: '', cvv: '' });
      }, 4000);
    }, 1500);
  };

  const handleAddBill = () => {
    if (!subscriberNo) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsAddBillModalOpen(false);
      toast({
        title: "Abonelik Başarıyla Eklendi",
        description: `${billNickName || subscriberNo} için abonelik tanımlandı.`,
      });
      setSubscriberNo('');
      setBillNickName('');
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

      <main className="px-6 pt-6 animate-fade-in space-y-8 max-w-md mx-auto">
        {/* Categories Grid */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Kategoriler</h2>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-2xl bg-white transition-all border-2",
                    isActive 
                      ? "border-primary shadow-lg scale-[1.05]" 
                      : "border-transparent shadow-soft opacity-70"
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <Icon className={cn("h-5 w-5", cat.color)} />
                  </div>
                  <span className="text-[9px] font-bold text-primary uppercase tracking-tighter text-center">{cat.label}</span>
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
              {billsData[selectedCategory]?.length || 0} Fatura
            </Badge>
          </div>
          
          <div className="space-y-4">
            {billsData[selectedCategory] && billsData[selectedCategory].length > 0 ? (
              billsData[selectedCategory].map((bill) => (
                <Card key={bill.id} className="border-none shadow-soft rounded-2xl overflow-hidden bg-white group transition-all">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                          {selectedCategory === 'water' && <Droplets className="h-5 w-5 text-blue-500" />}
                          {selectedCategory === 'gas' && <Flame className="h-5 w-5 text-orange-500" />}
                          {selectedCategory === 'electric' && <Zap className="h-5 w-5 text-yellow-500" />}
                          {selectedCategory === 'internet' && <Globe className="h-5 w-5 text-purple-500" />}
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

        {/* Add New Bill */}
        <section className="pt-2 pb-4">
          <Button 
            onClick={() => setIsAddBillModalOpen(true)}
            variant="outline" 
            className="w-full h-14 rounded-2xl border-dashed border-primary/30 text-primary hover:bg-primary/5 gap-2 border-2 group"
          >
            <Plus className="h-4 w-4" />
            <span className="font-bold text-sm">Yeni Abonelik Tanımla</span>
          </Button>
        </section>

        {/* Past Bills */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Geçmiş Faturalarım</h2>
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
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{bill.amount}</p>
                    <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-green-600">
                      <CheckCircle2 className="h-3 w-3" /> Ödendi
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Payment Confirmation Modal */}
      <Dialog open={isPayModalOpen} onOpenChange={setIsPayModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md rounded-3xl p-0 overflow-hidden border-none bg-[#FDFBF9]">
          <div className="p-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-primary">
                {isSuccess ? "Ödeme Başarılı" : "Ödemeyi Onayla"}
              </DialogTitle>
              <DialogDescription className="text-center text-xs text-muted-foreground">
                {selectedBill?.provider} {selectedBill?.title}
              </DialogDescription>
            </DialogHeader>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="relative">
                  <div className="absolute -inset-4 bg-green-500/20 rounded-full animate-ping"></div>
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/30">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-black text-green-600">Teşekkürler!</p>
                  <div className="bg-reward/10 border border-reward/20 rounded-xl p-4 flex flex-col items-center gap-2">
                     <div className="flex items-center gap-2 text-reward font-bold text-xs uppercase tracking-wider">
                       <Sparkles className="h-4 w-4" /> 50 Gül Puan Kazandınız!
                     </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-5 shadow-soft border border-border/50 text-center space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Ödenecek Tutar</p>
                  <p className="text-3xl font-black text-primary">{selectedBill?.amount}</p>
                </div>

                {!useDifferentCard ? (
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Ödeme Yöntemi</h3>
                    <Card className="border-none shadow-soft rounded-xl bg-white overflow-hidden border border-border/50">
                      <CardContent className="p-4 flex items-center justify-between">
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
                      </CardContent>
                    </Card>
                    <button 
                      onClick={() => setUseDifferentCard(true)}
                      className="w-full text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 py-2"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      Farklı Bir Kartla Öde
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Kart Bilgileri</h3>
                      <button 
                        onClick={() => setUseDifferentCard(false)}
                        className="text-[10px] font-bold text-primary"
                      >
                        Vazgeç
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label className="text-[9px] uppercase font-bold tracking-wider ml-1">Kart Üzerindeki İsim</Label>
                        <Input 
                          placeholder="AD SOYAD" 
                          className="h-10 rounded-xl bg-white text-xs"
                          value={tempCardData.name}
                          onChange={(e) => setTempCardData({...tempCardData, name: e.target.value.toUpperCase()})}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] uppercase font-bold tracking-wider ml-1">Kart Numarası</Label>
                        <div className="relative">
                          <Input 
                            placeholder="0000 0000 0000 0000" 
                            className="h-10 rounded-xl bg-white text-xs pl-10"
                            maxLength={19}
                            value={tempCardData.number}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '');
                              let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                              setTempCardData({...tempCardData, number: formatted});
                            }}
                          />
                          <CardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-[9px] uppercase font-bold tracking-wider ml-1">S.K.T.</Label>
                          <Input 
                            placeholder="AA/YY" 
                            className="h-10 rounded-xl bg-white text-xs"
                            value={tempCardData.expiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '');
                              if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                              setTempCardData({...tempCardData, expiry: val});
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[9px] uppercase font-bold tracking-wider ml-1">CVV</Label>
                          <Input 
                            placeholder="000" 
                            className="h-10 rounded-xl bg-white text-xs"
                            value={tempCardData.cvv}
                            onChange={(e) => setTempCardData({...tempCardData, cvv: e.target.value.replace(/\D/g, '')})}
                          />
                        </div>
                      </div>
                      <p className="text-[9px] text-muted-foreground italic text-center px-4">
                        * Bu bilgiler sistemde kayıtlı kalmayacak, sadece bu işlem için kullanılacaktır.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-medium">Güvenli SSL Ödeme</span>
                </div>
              </div>
            )}

            {!isSuccess && (
              <DialogFooter className="flex-col gap-3 sm:flex-col pb-4">
                <Button 
                  disabled={isProcessing || (useDifferentCard && (!tempCardData.number || !tempCardData.cvv))}
                  onClick={handlePayment}
                  className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl bg-primary hover:bg-primary/90 transition-all active:scale-95"
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
                  className="w-full text-muted-foreground font-bold uppercase tracking-widest text-[10px]"
                >
                  İptal Et
                </Button>
              </DialogFooter>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* New Subscription Modal */}
      <Dialog open={isAddBillModalOpen} onOpenChange={setIsAddBillModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md rounded-[2.5rem] p-0 overflow-hidden border-none bg-[#FDFBF9] shadow-2xl">
          <div className="p-8 space-y-8">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-primary">Yeni Abonelik Ekle</DialogTitle>
              <DialogDescription className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Kurum ve abone bilgilerinizi giriniz
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Kurum Seçin</h3>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setNewBillCategory(cat.id)}
                      className={cn(
                        "flex flex-col items-center p-2 rounded-xl bg-white transition-all border-2",
                        newBillCategory === cat.id 
                          ? "border-primary bg-primary/5 shadow-md" 
                          : "border-transparent shadow-sm opacity-60"
                      )}
                    >
                      <cat.icon className={cn("h-4 w-4 mb-1", cat.color)} />
                      <span className="text-[8px] font-bold text-primary uppercase">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-wider ml-1">Abone Numarası</Label>
                  <Input 
                    type="number"
                    inputMode="numeric"
                    placeholder="Örn: 1029384756"
                    className="h-12 rounded-xl border-border bg-white focus-visible:ring-primary focus-visible:border-primary text-lg font-bold"
                    value={subscriberNo}
                    onChange={(e) => setSubscriberNo(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-wider ml-1">Faturaya İsim Verin</Label>
                  <Input 
                    placeholder="Örn: Ev, Dükkan, Apartman"
                    className="h-12 rounded-xl border-border bg-white focus-visible:ring-primary focus-visible:border-primary"
                    value={billNickName}
                    onChange={(e) => setBillNickName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col gap-3">
              <Button 
                onClick={handleAddBill}
                disabled={!subscriberNo || isProcessing}
                className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sorgula ve Ekle"}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsAddBillModalOpen(false)}
                className="w-full text-muted-foreground font-bold uppercase tracking-widest text-[10px]"
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
