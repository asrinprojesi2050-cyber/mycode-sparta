
"use client"

import { useState } from 'react';
import { ArrowLeft, Bell, Calendar, ChevronRight, Share2, Sparkles, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BottomNav } from '@/components/bottom-nav';
import { summarizeMunicipalityAnnouncement } from '@/ai/flows/summarize-municipality-announcement-flow';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const announcements = [
  {
    id: 1,
    title: "Gül Festivali Başlıyor!",
    date: "12 Haziran 2024",
    category: "Etkinlik",
    image: PlaceHolderImages.find(img => img.id === 'announcement-2')?.imageUrl,
    content: "Isparta'nın simgesi güllerin hasat zamanı büyük bir coşkuyla kutlanacak. Festival kapsamında konserler, sergiler ve geleneksel gül suyu çıkarma atölyeleri düzenlenecektir. Tüm halkımız davetlidir. Isparta Meydanı'nda yapılacak açılış törenine yerel sanatçılarımız da eşlik edecek. Detaylı program belediye binası önündeki panolardan ve sosyal medya hesaplarımızdan takip edilebilir."
  },
  {
    id: 2,
    title: "Su Kesintisi Hakkında Bilgilendirme",
    date: "10 Haziran 2024",
    category: "Duyuru",
    image: PlaceHolderImages.find(img => img.id === 'announcement-1')?.imageUrl,
    content: "Merkez mahallelerde yapılacak olan ana boru hattı yenileme çalışmaları nedeniyle yarın 09:00 ile 18:00 saatleri arasında geçici su kesintisi yaşanacaktır. Vatandaşlarımızın gerekli önlemleri alması önemle rica olunur. Çalışmaların planlanandan daha erken bitmesi durumunda su verme işlemi hızlandırılacaktır. Anlayışınız için teşekkür ederiz."
  },
  {
    id: 3,
    title: "Yeni Akıllı Duraklar Hizmete Girdi",
    date: "8 Haziran 2024",
    category: "Ulaşım",
    image: PlaceHolderImages.find(img => img.id === 'parking')?.imageUrl,
    content: "Şehir içi ulaşımı modernleştirmek adına başlattığımız akıllı durak projesi kapsamında ilk etapta 20 durak aktif hale getirilmiştir. Bu duraklarda otobüs varış sürelerini anlık takip edebilir, ücretsiz internet hizmetinden yararlanabilirsiniz. Ayrıca engelli vatandaşlarımız için sesli bilgilendirme sistemi de entegre edilmiştir. Gelecek aylarda bu sayının 50'ye çıkarılması hedeflenmektedir."
  }
];

export default function AnnouncementsPage() {
  const [selectedNews, setSelectedNews] = useState<typeof announcements[0] | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleSummarize = async (text: string) => {
    setLoadingSummary(true);
    setSummary(null);
    try {
      const result = await summarizeMunicipalityAnnouncement({ announcementText: text });
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      setSummary("Özet çıkarılırken bir hata oluştu.");
    } finally {
      setLoadingSummary(false);
    }
  }

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl shadow-soft">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary">Belediye Duyuruları</h1>
      </header>

      <main className="px-6 pt-6 animate-fade-in space-y-6">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
          {["Hepsi", "Etkinlik", "Duyuru", "Ulaşım", "Kültür"].map((cat) => (
            <button key={cat} className={cn(
              "whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold border transition-all",
              cat === "Hepsi" ? "bg-primary text-white border-primary shadow-soft" : "bg-white text-muted-foreground border-border"
            )}>
              {cat}
            </button>
          ))}
        </div>

        {/* News Feed */}
        <div className="space-y-6">
          {announcements.map((news) => (
            <Card 
              key={news.id} 
              className="border-none shadow-soft rounded-2xl overflow-hidden bg-white cursor-pointer hover:scale-[1.01] transition-transform"
              onClick={() => setSelectedNews(news)}
            >
              <div className="relative h-44 w-full">
                <Image 
                  src={news.image || "https://picsum.photos/seed/news/800/600"} 
                  alt={news.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary">
                  {news.category}
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  {news.date}
                </div>
                <h3 className="font-bold text-lg mb-2 leading-tight">{news.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                  {news.content}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    Devamını Oku <ChevronRight className="h-3 w-3" />
                  </span>
                  <button className="p-2 text-muted-foreground hover:text-primary">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Detail Modal */}
      <Dialog open={!!selectedNews} onOpenChange={(open) => {
        if (!open) {
          setSelectedNews(null);
          setSummary(null);
        }
      }}>
        <DialogContent className="max-w-[90vw] md:max-w-lg rounded-2xl p-0 overflow-hidden max-h-[85vh] flex flex-col">
          <div className="relative h-48 w-full shrink-0">
            {selectedNews && (
              <Image 
                src={selectedNews.image || "https://picsum.photos/seed/news/800/600"} 
                alt={selectedNews.title}
                fill
                className="object-cover"
              />
            )}
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-foreground shadow-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <DialogHeader>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-bold">{selectedNews?.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {selectedNews?.date}
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold leading-tight">{selectedNews?.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
               {/* AI Tool Section */}
               {!summary && !loadingSummary ? (
                 <Button 
                   variant="outline" 
                   className="w-full border-accent text-accent hover:bg-accent/5 gap-2 h-11 rounded-xl"
                   onClick={() => handleSummarize(selectedNews?.content || "")}
                 >
                   <Sparkles className="h-4 w-4" />
                   Yapay Zeka ile Özetle
                 </Button>
               ) : loadingSummary ? (
                 <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex flex-col items-center gap-3 animate-pulse">
                   <Loader2 className="h-6 w-6 text-accent animate-spin" />
                   <p className="text-xs font-medium text-accent">Hızlı özet hazırlanıyor...</p>
                 </div>
               ) : summary ? (
                 <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 relative">
                   <div className="flex items-center gap-2 mb-3">
                     <Sparkles className="h-4 w-4 text-accent" />
                     <h4 className="text-xs font-bold text-accent uppercase tracking-wider">AI Özeti</h4>
                   </div>
                   <p className="text-sm text-foreground/90 leading-relaxed italic">
                     "{summary}"
                   </p>
                 </div>
               ) : null}

               <div className="text-sm text-muted-foreground leading-relaxed">
                 {selectedNews?.content}
               </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
