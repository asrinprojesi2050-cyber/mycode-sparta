
'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Wifi,
  QrCode,
  CreditCard,
  Plus,
  ChevronRight,
  History,
  Info,
  Sparkles,
  X,
  Loader2,
  CheckCircle2,
  Lock,
  ShieldCheck,
  CreditCard as CardIcon,
  Droplets,
  Flame,
  Zap,
  Globe,
  Receipt,
  Wallet
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type QrModalState = 'idle' | 'counting' | 'success';

interface RegisteredCard {
  id: string;
  bank: string;
  lastFour: string;
  type: 'VISA' | 'MASTERCARD';
  isDefault: boolean;
}

const INITIAL_CARDS: RegisteredCard[] = [
  { id: '1', bank: 'Ziraat Bankası', lastFour: '4242', type: 'VISA', isDefault: true },
  { id: '2', bank: 'İş Bankası', lastFour: '1234', type: 'MASTERCARD', isDefault: false },
];

const categories = [
  { id: 'water', label: 'Su', provider: 'Isparta Belediyesi', icon: Droplets, color: 'text-blue-500' },
  { id: 'gas', label: 'Doğalgaz', provider: 'Torosgaz', icon: Flame, color: 'text-orange-500' },
  { id: 'electric', label: 'Elektrik', provider: 'CK Akdeniz', icon: Zap, color: 'text-yellow-500' },
  { id: 'internet', label: 'İnternet', provider: 'Netİnternet', icon: Globe, color: 'text-purple-500' },
];

const billsData: Record<string, any[]> = {
  water: [
    { id: 24001, title: 'Haziran 2024 Faturası', dueDate: '25.06.2024', amount: '145.50 ₺', provider: 'Isparta Belediyesi' },
  ],
  gas: [
    { id: 35001, title: 'Mayıs Ayı Faturası', dueDate: '22.05.2024', amount: '210.25 ₺', provider: 'Torosgaz' },
  ],
  electric: [
    { id: 46001, title: 'Dönem Faturası', dueDate: '20.06.2024', amount: '385.40 ₺', provider: 'CK Akdeniz' },
  ],
  internet: [
    { id: 57001, title: 'ADSL/Fiber Faturası', dueDate: '18.06.2024', amount: '299.90 ₺', provider: 'Netİnternet' },
  ]
};

export default function IspartaKartPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('card');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isCustomAmountOpen, setIsCustomAmountOpen] = useState(false);
  const [isChangeCardOpen, setIsChangeCardOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [qrState, setQrState] = useState<QrModalState>('idle');
  const [qrCountdown, setQrCountdown] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  
  // Billing States
  const [selectedCategory, setSelectedCategory] = useState('water');
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [isAddBillModalOpen, setIsAddBillModalOpen] = useState(false);

  // Card Management States
  const [registeredCards, setRegisteredCards] = useState<RegisteredCard[]>(INITIAL_CARDS);
  const [activeCardId, setActiveCardId] = useState('1');
  const [newCardData, setNewCardData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
    setAsDefault: false
  });

  const activeCard = registeredCards.find(c => c.id === activeCardId) || registeredCards[0];

  // QR Interaction Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQrModalOpen && qrState === 'counting') {
      if (qrCountdown > 0) {
        timer = setInterval(() => {
          setQrCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
        setQrState('success');
        timer = setTimeout(() => handleCloseQr(), 3000);
      }
    }
    return () => clearInterval(timer);
  }, [isQrModalOpen, qrState, qrCountdown]);

  const handleOpenQr = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    setQrCountdown(5);
    setQrState('counting');
    setIsQrModalOpen(true);
  };

  const handleCloseQr = () => {
    setIsQrModalOpen(false);
    setTimeout(() => {
      setQrState('idle');
      setQrCountdown(5);
    }, 300);
  };

  const handleTopupConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsTopupModalOpen(false);
      }, 3000);
    }, 2000);
  };

  const handleBillPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsPayModalOpen(false);
        setSelectedBill(null);
      }, 3000);
    }, 2000);
  };

  const handleAddNewCard = () => {
    const newCard: RegisteredCard = {
      id: Math.random().toString(36).substr(2, 9),
      bank: 'Yeni Kart',
      lastFour: newCardData.number.slice(-4),
      type: 'VISA',
      isDefault: newCardData.setAsDefault
    };
    setRegisteredCards(prev => [...prev, newCard]);
    setIsChangeCardOpen(false);
  };

  const RoseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
      <path d="M12 22s-1-4-1-5 2-4 2-4" />
      <path d="M12 13c-1-1-4-2-4-4s1-3 2-3 2 1 2 3" />
      <path d="M12 13c1-1 4-2 4-4s-1-3-2-3-2 1-2 3" />
      <path d="M12 13v-4" />
      <circle cx="12" cy="7" r="3" />
    </svg>
  );

  return (
    <div className="pb-32 min-h-screen bg-[#FDFBF9]">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Cüzdanım</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-6 max-w-md mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 rounded-2xl bg-white border border-border/50 p-1 mb-8 shadow-sm">
            <TabsTrigger value="card" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs">Kart Yönetimi</TabsTrigger>
            <TabsTrigger value="bills" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs">Faturalar</TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="space-y-8 mt-0">
            {/* Virtual Card */}
            <section className="flex justify-center">
              <div className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-[1.5rem] blur-xl opacity-20"></div>
                <Card className="relative border-none bg-gradient-to-br from-[#8D3B4A] via-[#A64459] to-[#8D3B4A] text-white rounded-[1.25rem] overflow-hidden shadow-2xl aspect-[1.58/1] flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 mb-1">
                        <RoseIcon />
                        <span className="font-bold text-[10px] tracking-tight uppercase">MyCode City</span>
                      </div>
                      <p className="text-[8px] text-white/60 uppercase tracking-[0.2em] font-medium">Sanal Ulaşım Kartı</p>
                    </div>
                    <Wifi className="h-4 w-4 text-white/70 rotate-90" />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/50 uppercase tracking-widest mb-0.5 font-bold">Güncel Bakiye</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tighter">142.50</span>
                      <span className="text-lg font-medium opacity-80">₺</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end relative z-10">
                    <p className="text-[9px] font-mono tracking-[0.2em] opacity-40">5432 **** **** 1234</p>
                    <div className="h-6 w-9 bg-white/20 rounded-sm backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <div className="w-4 h-2.5 bg-yellow-500/80 rounded-[1px]" />
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleOpenQr} className="h-16 rounded-2xl bg-accent text-white hover:bg-accent/90 shadow-lg font-bold gap-3">
                  <QrCode className="h-6 w-6" /> QR Okut
                </Button>
                <Button onClick={() => setIsTopupModalOpen(true)} className="h-16 rounded-2xl bg-white border border-primary/20 text-primary hover:bg-primary/5 shadow-soft font-bold gap-3">
                  <Plus className="h-6 w-6" /> Bakiye Yükle
                </Button>
              </div>
            </section>

            {/* Recent History */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Son Hareketler</h2>
                <Link href="/isparta-kart/history" className="text-[10px] font-bold text-primary uppercase">Tümünü Gör</Link>
              </div>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <Card key={i} className="border-none shadow-soft rounded-2xl bg-white">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                          <History className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Halk Otobüsü - Hat 18</p>
                          <p className="text-[9px] text-muted-foreground font-medium">Bugün, 08:45</p>
                        </div>
                      </div>
                      <p className="font-bold text-xs text-primary">-15.00 ₺</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="bills" className="space-y-6 mt-0">
            {/* Categories */}
            <section className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-2xl bg-white transition-all border-2",
                    selectedCategory === cat.id ? "border-primary shadow-lg scale-105" : "border-transparent shadow-soft opacity-60"
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
                    <cat.icon className={cn("h-5 w-5", cat.color)} />
                  </div>
                  <span className="text-[8px] font-bold text-primary uppercase">{cat.label}</span>
                </button>
              ))}
            </section>

            {/* Unpaid Bills */}
            <section className="space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Bekleyen Borçlar</h2>
              {billsData[selectedCategory]?.map((bill) => (
                <Card key={bill.id} className="border-none shadow-soft rounded-2xl overflow-hidden bg-white">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-sm leading-tight">{bill.title}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase">{bill.provider}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{bill.amount}</p>
                        <p className="text-[9px] font-bold text-red-500 uppercase">Son: {bill.dueDate}</p>
                      </div>
                    </div>
                    <Button onClick={() => { setSelectedBill(bill); setIsPayModalOpen(true); }} className="w-full bg-primary hover:bg-primary/90 h-11 rounded-xl">Hemen Öde</Button>
                  </CardContent>
                </Card>
              ))}
            </section>

            <Button onClick={() => setIsAddBillModalOpen(true)} variant="outline" className="w-full h-14 rounded-2xl border-dashed border-primary/30 text-primary gap-2 border-2">
              <Plus className="h-4 w-4" /> Yeni Abonelik Ekle
            </Button>
          </TabsContent>
        </Tabs>
      </main>

      {/* QR Modal */}
      <Dialog open={isQrModalOpen} onOpenChange={handleCloseQr}>
        <DialogContent className="max-w-[85vw] sm:max-w-sm rounded-[2.5rem] p-8 border-none bg-white shadow-2xl overflow-hidden">
          <div className="flex flex-col items-center gap-8 py-4">
            <div className="text-center space-y-1">
              <DialogTitle className="text-2xl font-black text-accent tracking-tight">Dijital Biniş</DialogTitle>
              <DialogDescription className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kullanıma Hazır</DialogDescription>
            </div>
            <div className={cn(
              "relative p-6 bg-white rounded-[2rem] shadow-inner border-4 transition-all duration-500",
              qrState === 'success' ? "border-green-500" : "border-accent/20"
            )}>
              {qrState === 'success' ? (
                <div className="w-48 h-48 flex items-center justify-center animate-in zoom-in">
                  <CheckCircle2 className="h-24 w-24 text-green-500" />
                </div>
              ) : (
                <QrCode className="h-48 w-48 text-accent animate-pulse" />
              )}
            </div>
            {qrState === 'counting' && (
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent text-accent font-bold text-xl">
                {qrCountdown}
              </div>
            )}
            <Button variant="ghost" onClick={handleCloseQr} className="p-2 rounded-full"><X className="h-6 w-6" /></Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Topup Modal */}
      <Dialog open={isTopupModalOpen} onOpenChange={setIsTopupModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md rounded-3xl p-6 bg-white">
          <DialogHeader><DialogTitle className="text-center">Bakiye Yükleme</DialogTitle></DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 200].map(amt => (
                <Button key={amt} variant={selectedAmount === amt ? 'default' : 'outline'} onClick={() => setSelectedAmount(amt)} className="h-12 rounded-xl">{amt} ₺</Button>
              ))}
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase ml-1">Kayıtlı Kart</Label>
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div><p className="text-xs font-bold">{activeCard.bank}</p><p className="text-[10px] text-muted-foreground">**** {activeCard.lastFour}</p></div>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-bold text-primary" onClick={() => setIsChangeCardOpen(true)}>Değiştir</Button>
              </div>
            </div>
            {isProcessing ? (
              <div className="flex flex-col items-center gap-3 py-6"><Loader2 className="h-8 w-8 text-primary animate-spin" /><p className="text-xs font-bold">Onaylanıyor...</p></div>
            ) : isSuccess ? (
              <div className="flex flex-col items-center gap-3 py-6 text-green-600"><CheckCircle2 className="h-10 w-10 animate-in zoom-in" /><p className="text-xs font-bold">Bakiye Eklendi!</p></div>
            ) : (
              <Button onClick={handleTopupConfirm} className="w-full h-14 rounded-2xl text-lg font-bold">Ödemeyi Onayla</Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={isPayModalOpen} onOpenChange={setIsPayModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md rounded-3xl p-6 bg-white">
          <DialogHeader><DialogTitle className="text-center">Fatura Öde</DialogTitle></DialogHeader>
          <div className="space-y-6 py-4 text-center">
            <div className="bg-primary/5 p-6 rounded-2xl">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{selectedBill?.provider}</p>
              <p className="text-3xl font-black text-primary">{selectedBill?.amount}</p>
            </div>
            {isProcessing ? (
              <div className="flex flex-col items-center gap-3 py-6"><Loader2 className="h-8 w-8 text-primary animate-spin" /><p className="text-xs font-bold">İşlem Yapılıyor...</p></div>
            ) : isSuccess ? (
              <div className="flex flex-col items-center gap-4 py-6 text-green-600">
                <CheckCircle2 className="h-10 w-10 animate-in zoom-in" />
                <div className="space-y-1">
                  <p className="text-xs font-bold">Faturanız Ödendi!</p>
                  <p className="text-[10px] text-reward font-black uppercase tracking-wider flex items-center justify-center gap-1"><Sparkles className="h-3 w-3" /> 50 Gül Puan Kazandınız</p>
                </div>
              </div>
            ) : (
              <Button onClick={handleBillPayment} className="w-full h-14 rounded-2xl text-lg font-bold">Ödemeyi Onayla</Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
