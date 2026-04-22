import { NextResponse } from 'next/server';

// Sunucu tarafında sahte otobüs verileri
let busData = [
  { 
    id: 1, 
    hat: '18', 
    guzergah: 'SDÜ - Çarşı', 
    durak: 'Iyaşpark Durağı', 
    kalanDakika: 3, 
    durum: 'Yaklaşıyor',
    doluluk: 'Sakin'
  },
  { 
    id: 2, 
    hat: '37', 
    guzergah: 'Otogar - Çarşı', 
    durak: 'Iyaşpark Durağı', 
    kalanDakika: 12, 
    durum: 'Yolda',
    doluluk: 'Kalabalık'
  },
  { 
    id: 3, 
    hat: '22', 
    guzergah: 'Işıkkent - SDÜ', 
    durak: 'Iyaşpark Durağı', 
    kalanDakika: 5, 
    durum: 'Yaklaşıyor',
    doluluk: 'Normal'
  },
  { 
    id: 4, 
    hat: '9', 
    guzergah: 'Çünür - Çarşı', 
    durak: 'Iyaşpark Durağı', 
    kalanDakika: 18, 
    durum: 'Yolda',
    doluluk: 'Sakin'
  },
];


function simulateRealTimeData() {
    return busData.map(bus => {
        let newKalanDakika = bus.kalanDakika - 1; 

        if (newKalanDakika < 0) {
            newKalanDakika = 20; // Otobüs turu tamamladı, yeni tur için başlangıç
        }

        let durum = 'Yolda';
        if (newKalanDakika <= 3) {
            durum = 'Yaklaşıyor';
        }
        if (newKalanDakika === 0) {
            durum = 'Durakta';
        }

        return {
            ...bus,
            kalanDakika: newKalanDakika,
            durum: durum,
        };
    });
}

export async function GET() {
  busData = simulateRealTimeData();
  return NextResponse.json(busData);
}
