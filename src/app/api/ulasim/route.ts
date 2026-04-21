import { NextResponse } from 'next/server';

// Sunucu tarafında sahte otobüs verileri
const busData = [
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

export async function GET() {
  // Gerçekçi olması için her istekte dakikaları rastgele (mantıklı sınırlar içinde) simüle edebiliriz
  return NextResponse.json(busData);
}
