import { NextResponse } from 'next/server';

// Sunucu tarafında verileri bellekte tutuyoruz
let parkingLots = [
  { 
    id: 1, 
    name: "Meydan AVM Otoparkı", 
    total: 500, 
    free: 42,
    price: "15₺ / saat", 
    distance: "0.4 km",
    coords: "37.7648,30.5566",
    floors: [
      { label: "Zemin Kat", free: 12 },
      { label: "-1. Kat", free: 0 },
      { label: "-2. Kat", free: 30 },
    ],
    advice: "Şu an -2. Kat daha müsait, oraya yönlenebilirsiniz."
  },
  { 
    id: 2, 
    name: "Iyaşpark Yan Otopark", 
    total: 800, 
    free: 350,
    price: "Ücretsiz", 
    distance: "1.2 km",
    coords: "37.7833,30.5500",
    floors: [
      { label: "Zemin Kat", free: 150 },
      { label: "-1. Kat", free: 200 },
    ],
    advice: "Tüm katlar müsait, rahatça park edebilirsiniz."
  },
  { 
    id: 3, 
    name: "Belediye Yeraltı Otoparkı", 
    total: 300, 
    free: 0,
    price: "10₺ / saat", 
    distance: "2.1 km",
    coords: "37.7600,30.5400",
    floors: [
      { label: "Zemin Kat", free: 0 },
      { label: "-1. Kat", free: 0 },
      { label: "-2. Kat", free: 0 },
    ],
    advice: "Maalesef şu an yer bulunmamaktadır. En yakın Meydan AVM'ye yönelebilirsiniz."
  }
];

export async function GET() {
  // Verileri dönerken status stringlerini dinamik oluşturuyoruz
  const data = parkingLots.map(lot => ({
    ...lot,
    floors: lot.floors.map(f => ({
      ...f,
      status: f.free > 0 ? `${f.free} Boş Yer` : "DOLU",
      isFull: f.free === 0
    }))
  }));
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const { id, floorLabel } = await request.json();
    
    const lotIndex = parkingLots.findIndex(l => l.id === id);
    if (lotIndex !== -1) {
      const floorIndex = parkingLots[lotIndex].floors.findIndex(f => f.label === floorLabel);
      
      if (floorIndex !== -1 && parkingLots[lotIndex].floors[floorIndex].free > 0) {
        // Boş yer sayısını azalt
        parkingLots[lotIndex].floors[floorIndex].free -= 1;
        parkingLots[lotIndex].free -= 1;
        
        return NextResponse.json({ success: true });
      }
    }
    
    return NextResponse.json({ success: false, message: "Yer bulunamadı veya kat dolu." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Geçersiz istek." }, { status: 500 });
  }
}
