
"use client"

import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Settings, Shield, HelpCircle, LogOut, Sparkles, ChevronRight, Save, X, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BottomNav } from '@/components/bottom-nav';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { toast } = useToast();
  
  // User Data State
  const [userData, setUserData] = useState({
    name: "Merhaba Vatandaş",
    email: "vatandas@isparta.bel.tr",
    phone: "+90 (500) 000 00 00",
  });

  // UI States
  const [activeTab, setActiveTab] = useState<'none' | 'profile' | 'security'>('none');
  const [tempData, setTempData] = useState({ ...userData });
  const [passwords, setPasswords] = useState({ old: '', new: '' });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({ ...userData, name: tempData.name, phone: tempData.phone });
    setActiveTab('none');
    toast({
      title: "Başarılı",
      description: "Profil bilgileriniz güncellendi.",
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.old || !passwords.new) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
      });
      return;
    }
    setPasswords({ old: '', new: '' });
    setActiveTab('none');
    toast({
      title: "Şifre Güncellendi",
      description: "Yeni şifreniz başarıyla kaydedildi.",
    });
  };

  return (
    <div className="pb-32 min-h-screen bg-[#FDFBF9]">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Profilim</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-8 max-w-md mx-auto">
        {/* User Info & Points */}
        <section className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-lg relative">
            <User className="h-12 w-12 text-primary" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#8D3B4A] rounded-full border-2 border-white flex items-center justify-center shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary tracking-tight">{userData.name}</h2>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 text-primary bg-primary/5 shadow-sm">
              <Sparkles className="h-3 w-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Toplam Gül Puanım: 1250</span>
            </div>
          </div>
        </section>

        {/* Contact Info Card */}
        <section>
          <Card className="border-none shadow-soft rounded-2xl bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border/30 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-primary/60">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">E-posta</p>
                  <p className="text-sm font-bold text-foreground/80">{userData.email}</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-primary/60">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Telefon</p>
                  <p className="text-sm font-bold text-foreground/80">{userData.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Menu */}
        <section className="space-y-4">
          {/* Account Settings */}
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab(activeTab === 'profile' ? 'none' : 'profile')}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl bg-white shadow-soft transition-all group",
                activeTab === 'profile' && "ring-2 ring-primary ring-offset-2"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                  <Settings className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-foreground/80">Hesap Ayarları</span>
              </div>
              <ChevronRight className={cn("h-4 w-4 text-muted-foreground/30 transition-transform", activeTab === 'profile' && "rotate-90")} />
            </button>

            {activeTab === 'profile' && (
              <Card className="border-none shadow-xl rounded-2xl bg-white animate-in slide-in-from-top-2 duration-300">
                <CardContent className="p-6">
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ad Soyad</Label>
                      <Input 
                        value={tempData.name}
                        onChange={(e) => setTempData({...tempData, name: e.target.value})}
                        className="h-11 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Telefon</Label>
                      <Input 
                        value={tempData.phone}
                        onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                        className="h-11 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button type="submit" className="flex-1 h-11 rounded-xl bg-primary font-bold shadow-lg shadow-primary/20">
                        <Save className="h-4 w-4 mr-2" /> Kaydet
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setActiveTab('none')} className="h-11 rounded-xl border-primary/20 text-primary font-bold">
                        İptal
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Security Settings */}
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab(activeTab === 'security' ? 'none' : 'security')}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl bg-white shadow-soft transition-all group",
                activeTab === 'security' && "ring-2 ring-primary ring-offset-2"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-foreground/80">Güvenlik ve Şifre</span>
              </div>
              <ChevronRight className={cn("h-4 w-4 text-muted-foreground/30 transition-transform", activeTab === 'security' && "rotate-90")} />
            </button>

            {activeTab === 'security' && (
              <Card className="border-none shadow-xl rounded-2xl bg-white animate-in slide-in-from-top-2 duration-300">
                <CardContent className="p-6">
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Eski Şifre</Label>
                      <div className="relative">
                        <Input 
                          type="password"
                          placeholder="••••••••"
                          value={passwords.old}
                          onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                          className="h-11 rounded-xl bg-secondary/30 border-none pl-10 focus-visible:ring-primary"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Yeni Şifre</Label>
                      <div className="relative">
                        <Input 
                          type="password"
                          placeholder="••••••••"
                          value={passwords.new}
                          onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                          className="h-11 rounded-xl bg-secondary/30 border-none pl-10 focus-visible:ring-primary"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button type="submit" className="flex-1 h-11 rounded-xl bg-accent font-bold shadow-lg shadow-accent/20">
                        Şifreyi Güncelle
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Other Links */}
          <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white shadow-soft group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground">
                <HelpCircle className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-foreground/80">Yardım ve Destek</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
          </button>
          
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 text-red-600 mt-6 active:scale-[0.98] transition-all border border-red-100">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="text-sm font-black uppercase tracking-wider">Çıkış Yap</span>
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
