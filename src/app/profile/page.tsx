
"use client"

import { ArrowLeft, User, Mail, Phone, Settings, Shield, HelpCircle, LogOut, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/bottom-nav';

export default function ProfilePage() {
  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft border border-border/50">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary tracking-tight">Profilim</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-8">
        {/* User Info & Points */}
        <section className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-lg relative">
            <User className="h-12 w-12 text-primary" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-reward rounded-full border-2 border-white flex items-center justify-center shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary">Merhaba Vatandaş</h2>
            {/* Gül Puan Rozeti */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-reward text-reward bg-reward/5 shadow-sm">
              <Sparkles className="h-3 w-3" />
              <span className="text-xs font-bold uppercase tracking-wider">Toplam Gül Puanım: 1250</span>
            </div>
          </div>
        </section>

        {/* Contact Info Card */}
        <section>
          <Card className="border-none shadow-soft rounded-2xl bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border/50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">E-posta</p>
                  <p className="text-sm font-medium">vatandas@isparta.bel.tr</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Telefon</p>
                  <p className="text-sm font-medium">+90 (500) 000 00 00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Menu Items */}
        <section className="space-y-3">
          {[
            { label: "Hesap Ayarları", icon: Settings },
            { label: "Güvenlik ve Şifre", icon: Shield },
            { label: "Yardım ve Destek", icon: HelpCircle },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl bg-white shadow-soft group active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-foreground/80">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/50" />
            </button>
          ))}
          
          <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-50 text-red-600 mt-6 active:scale-[0.98] transition-all">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold">Çıkış Yap</span>
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
