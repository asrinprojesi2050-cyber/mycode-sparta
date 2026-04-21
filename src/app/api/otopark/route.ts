import { NextResponse } from 'next/server';

export async function GET() {
  const parkingLots = [
    { 
      id: 1, 
      name: "Meydan AVM Otoparkı", 
      total: 500, 
      current: 458, 
      free: 42,
      price: "15₺ / saat", 
      distance: "0.4 km",
      coords: "37.7648,30.5566",
      floors: [
        { label: "Zemin Kat", status: "12 Boş Yer", isFull: false },
        { label: "-1. Kat", status: "DOLU", isFull: true },
        { label: "-2. Kat", status: "30 Boş Yer", isFull: false },
      ],
      advice: "Şu an -2. Kat daha müsait, oraya yönlenebilirsiniz."
    },
    { 
      id: 2, 
      name: "Iyaşpark Yan Otopark", 
      total: 800, 
      current: 450, 
      free: 350,
      price: "Ücretsiz", 
      distance: "1.2 km",
      coords: "37.7833,30.5500",
      floors: [
        { label: "Zemin Kat", status: "150 Boş Yer", isFull: false },
        { label: "-1. Kat", status: "200 Boş Yer", isFull: false },
      ],
      advice: "Tüm katlar müsait, rahatça park edebilirsiniz."
    },
    { 
      id: 3, 
      name: "Belediye Yeraltı Otoparkı", 
      total: 300, 
      current: 300, 
      free: 0,
      price: "10₺ / saat", 
      distance: "2.1 km",
      coords: "37.7600,30.5400",
      floors: [
        { label: "Zemin Kat", status: "DOLU", isFull: true },
        { label: "-1. Kat", status: "DOLU", isFull: true },
        { label: "-2. Kat", status: "DOLU", isFull: true },
      ],
      advice: "Maalesef şu an yer bulunmamaktadır. En yakın Meydan AVM'ye yönelebilirsiniz."
    }
  ];

  return NextResponse.json(parkingLots);
}
