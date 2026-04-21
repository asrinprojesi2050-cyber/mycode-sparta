import { NextResponse } from 'next/server';

// Sunucu tarafında sahte otobüs verileri
const busData = [
  { id: 1, hat: '18', guzergah: 'SDÜ - Çarşı', durak: 'Iyaşpark Durağı', kalanDakika: 3, durum: 'Yaklaşıyor' },
  { id: 2, hat: '37', guzergah: 'Otogar - Çarşı', durak: 'Iyaşpark Durağı', kalanDakika: 12, durum: 'Yolda' },
  { id: 3, hat: '22', guzergah: 'Işıkkent - SDÜ', durak: 'Iyaşpark Durağı', kalanDakika: 5, durum: 'Yaklaşıyor' },
  { id: 4, hat: '9', guzergah: 'Çünür - Çarşı', durak: 'Iyaşpark Durağı', kalanDakika: 18, durum: 'Yolda' },
];

export async function GET() {
  // Gerçekçi olması için her istekte dakikaları rastgele (mantıklı sınırlar içinde) simüle edebiliriz
  // Şimdilik sabit listeyi dönüyoruz
  return NextResponse.json(busData);
}
