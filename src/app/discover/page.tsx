
        import React from 'react';
        import { Flower2, Waves, MountainSnow, Bird, Footprints, Landmark, Building2, ArrowLeft, ExternalLink } from 'lucide-react';
        import Link from 'next/link';
        import { BottomNav } from '@/components/bottom-nav';

        const DiscoverIspartaPage = () => {
          const places = [
            {
              title: "Gül ve Lavanta Bahçeleri",
              description: "Isparta, dünya gül yağı üretiminin kalbidir. Özellikle Kuyucak köyündeki uçsuz bucaksız lavanta tarlaları, mor rengin büyüleyici tonlarıyla son yılların en gözde ekoturizm rotası haline gelmiştir.",
              icon: Flower2,
              gradient: "bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-700",
              wikiUrl: "https://tr.wikipedia.org/wiki/Isparta"
            },
            {
              title: "Eğirdir Gölü",
              description: "Türkiye'nin dördüncü büyük gölü olan Eğirdir, günün her saatinde değişen rengiyle 'Yedi Renkli Göl' olarak bilinir. Can Ada ve Yeşilada gibi eşsiz güzellikleriyle huzur dolu bir doğa harikasıdır.",
              icon: Waves,
              gradient: "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400",
              wikiUrl: "https://tr.wikipedia.org/wiki/E%C4%9Firdir_G%C3%B6l%C3%BC"
            },
            {
              title: "Davraz Kayak Merkezi",
              description: "Torosların zirvesindeki Davraz, her seviyeden kayakçıya hitap eden mükemmel pistler sunar. Zirveden kayarken Eğirdir Gölü'nün muazzam manzarasını izleme ayrıcalığına sadece burada sahip olabilirsiniz.",
              icon: MountainSnow,
              gradient: "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600",
              wikiUrl: "https://tr.wikipedia.org/wiki/Davraz_Kayak_Merkezi"
            },
            {
              title: "Kovada Gölü Milli Parkı",
              description: "Zengin bitki örtüsü ve yaban hayatıyla tam bir doğa cennetidir. Yüzlerce kuş türüne ev sahipliği yapan park, doğa yürüyüşü, kamp ve fotoğrafçılık tutkunları için benzersiz bir atmosfere sahiptir.",
              icon: Bird,
              gradient: "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-700",
              wikiUrl: "https://tr.wikipedia.org/wiki/Kovada_G%C3%B6l%C3%B6_Milli_Park%C4%B1"
            },
            {
              title: "Yazılı Kanyon",
              description: "Tarihi Kral Yolu'nun geçtiği bu büyüleyici kanyon, adını sarp kayalıklara kazınmış antik filozof Epiktetos'un şiirlerinden alır. Berrak suları ve çam kokulu havasıyla serinlemek için idealdir.",
              icon: Footprints,
              gradient: "bg-gradient-to-br from-lime-600 via-green-600 to-emerald-800",
              wikiUrl: "https://tr.wikipedia.org/wiki/Yaz%C4%B1l%C4%B1_Kanyon_Tabiat_Park%C4%B1"
            },
            {
              title: "Sagalassos Antik Kenti",
              description: "Ağlasun dağlarının eteklerinde, bulutların arasındaki bu görkemli Roma şehri 'Aşkların ve İmparatorların Şehri' olarak bilinir. Binlerce yıldır akan antik Antoninler Çeşmesi ile görenleri büyülemektedir.",
              icon: Landmark,
              gradient: "bg-gradient-to-br from-amber-500 via-orange-500 to-red-600",
              wikiUrl: "https://tr.wikipedia.org/wiki/Sagalassos"
            },
            {
              title: "Isparta Müzesi",
              description: "Bölgenin köklü geçmişine ışık tutan müze, Pisidia bölgesinin zengin arkeolojik eserlerine ev sahipliği yapar. Ayrıca Isparta'nın dünyaca ünlü geleneksel halıcılık kültürü de burada sergilenmektedir.",
              icon: Building2,
              gradient: "bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-800",
              wikiUrl: "https://tr.wikipedia.org/wiki/Isparta_M%C3%BCzesi"
            },
          ];

          return (
            <div className="min-h-screen bg-[#FDFBF9] pb-24">
              <header className="px-6 pt-8 pb-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-40">
                <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-white border border-border shadow-soft flex items-center justify-center text-primary">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className='text-center'>
                  <h1 className="text-xl font-bold text-primary tracking-tight">Isparta'yı Keşfet</h1>
                  <p className="text-xs text-muted-foreground">Güller ve Göller Diyarı</p>
                </div>
                <div className="w-10 h-10"></div>
              </header>

              <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.map((place, index) => (
                  <a key={index} href={place.wikiUrl} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className={`relative rounded-3xl overflow-hidden shadow-2xl h-full text-white transform transition-transform duration-300 group-hover:scale-105 active:scale-95 ${place.gradient}`}>
                      <div className="relative h-full p-6 flex flex-col justify-between min-h-[220px]">
                        <div className="flex justify-between items-start">
                           <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg">
                              <place.icon className="w-8 h-8" />
                           </div>
                           <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div className="mt-4">
                          <h3 className="font-bold text-xl">{place.title}</h3>
                          <p className="text-sm text-white/80 font-sans mt-1">{place.description}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </main>
              <BottomNav />
            </div>
          );
        };

        export default DiscoverIspartaPage;
        