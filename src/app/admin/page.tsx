"use client";

import React from 'react';
import { 
  Users, 
  Bus, 
  ParkingSquare, 
  Star, 
  Bell, 
  Search, 
  LayoutDashboard, 
  UserCircle, 
  MapPin, 
  Settings,
  LogOut,
  ChevronRight,
  Menu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Toplam Kullanıcı",
      value: "14.250",
      change: "+%12",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Aktif Otobüsler",
      value: "45/52",
      status: "Sorunsuz",
      icon: Bus,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Otopark Doluluğu",
      value: "%82",
      icon: ParkingSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Dağıtılan Gül Puan",
      value: "345.500",
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    }
  ];

  const recentActivity = [
    { id: 1, user: "Yasin D.", action: "faturasını ödedi", reward: "50 Gül Puan", time: "2 dakika önce", type: "payment" },
    { id: 2, plate: "32 ABC 123", action: "Merkez Otopark'a giriş yaptı", time: "5 dakika önce", type: "parking" },
    { id: 3, line: "18 Numaralı Hat", action: "sefere başladı", time: "12 dakika önce", type: "transport" },
    { id: 4, user: "Ayşe K.", action: "yeni üyelik oluşturdu", time: "15 dakika önce", type: "user" },
    { id: 5, user: "Mehmet Y.", action: "Gül Puan ile bilet aldı", time: "20 dakika önce", type: "reward" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="bg-rose-600 p-1.5 rounded-lg">MC</span>
            MyCode Yönetim
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Ana Menü</div>
          <SidebarItem icon={LayoutDashboard} label="Gösterge Paneli" active />
          <SidebarItem icon={Users} label="Vatandaşlar" />
          <SidebarItem icon={Bus} label="Ulaşım Ağı" />
          <SidebarItem icon={ParkingSquare} label="Otopark Yönetimi" />
          <SidebarItem icon={Star} label="Gül Puan Sistemi" />
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-8 mb-4 px-2">Sistem</div>
          <SidebarItem icon={Settings} label="Ayarlar" />
          <SidebarItem icon={LogOut} label="Çıkış Yap" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center flex-1">
            <div className="relative w-96 max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Vatandaş, araç veya işlem ara..." 
                className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-rose-500"
              />
            </div>
            <button className="md:hidden p-2 text-gray-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-none">Sistem Yöneticisi</p>
                <p className="text-xs text-gray-500 mt-1">Süper Admin</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-white ring-2 ring-gray-100">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <AvatarFallback>SY</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Komuta Merkezi</h2>
            <p className="text-gray-500 mt-1">İsparta Belediyesi genel sistem durumu ve canlı veriler.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    {stat.change && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {stat.change}
                      </Badge>
                    )}
                    {stat.status && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {stat.status}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity Table */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-100 flex flex-row items-center justify-between p-6">
              <CardTitle className="text-lg font-bold text-gray-900">Son İşlemler</CardTitle>
              <button className="text-sm font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1">
                Tümünü Gör <ChevronRight className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlem</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Detay</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarih</th>
                      <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentActivity.map((activity) => (
                      <tr key={activity.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              activity.type === 'payment' ? 'bg-blue-100 text-blue-600' :
                              activity.type === 'parking' ? 'bg-orange-100 text-orange-600' :
                              activity.type === 'transport' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              {activity.type === 'payment' && <Star className="h-4 w-4" />}
                              {activity.type === 'parking' && <ParkingSquare className="h-4 w-4" />}
                              {activity.type === 'transport' && <Bus className="h-4 w-4" />}
                              {activity.type === 'user' && <Users className="h-4 w-4" />}
                              {activity.type === 'reward' && <Star className="h-4 w-4" />}
                            </div>
                            <span className="font-semibold text-gray-900">{activity.user || activity.plate || activity.line}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-600 text-sm">
                            {activity.action} {activity.reward && <span className="font-medium text-amber-600">({activity.reward})</span>}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-400 text-sm">{activity.time}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-normal">
                            Tamamlandı
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
      active 
        ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}>
      <Icon className={`h-5 w-5 ${active ? 'text-white' : 'group-hover:text-white'}`} />
      <span className="font-medium text-sm">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>}
    </button>
  );
}
