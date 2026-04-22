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

// Aktif randevuları süreli olarak takip etmek için
let activeReservations: any[] = [];

// Randevu süresi (ms cinsinden) - 30 Dakika
const RESERVATION_TIMEOUT = 30 * 60 * 1000;

function cleanupExpiredReservations() {
  const now = Date.now();
  activeReservations = activeReservations.filter(res => {
    const expired = now - res.createdAt > RESERVATION_TIMEOUT;
    if (expired) {
      const lot = parkingLots.find(l => l.id === res.lotId);
      if (lot) {
        const floor = lot.floors.find(f => f.label === res.floor);
        if (floor) {
          floor.free += 1;
          lot.free += 1;
        }
      }
    }
    return !expired;
  });
}

export async function GET() {
  cleanupExpiredReservations();

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
    const body = await request.json();
    const { id, floorLabel } = body;
    
    if (!id || !floorLabel) {
      return NextResponse.json({ success: false, message: 'Eksik parametreler.' }, { status: 400 });
    }

    cleanupExpiredReservations();

    const lot = parkingLots.find(l => l.id === id);
    if (!lot) {
      return NextResponse.json({ success: false, message: "Otopark bulunamadı." }, { status: 404 });
    }

    const floor = lot.floors.find(f => f.label === floorLabel);
    if (!floor) {
      return NextResponse.json({ success: false, message: "Kat bulunamadı." }, { status: 404 });
    }

    if (floor.free > 0) {
      floor.free -= 1;
      lot.free -= 1;
      
      const expiresAt = Date.now() + RESERVATION_TIMEOUT;
      
      activeReservations.push({
        lotId: id,
        floor: floorLabel,
        createdAt: Date.now(),
        expiresAt: expiresAt
      });
      
      return NextResponse.json({ 
        success: true, 
        expiresAt: expiresAt 
      });
    } else {
      return NextResponse.json({ success: false, message: "Yer bulunamadı veya kat dolu." }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Geçersiz istek." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, floorLabel } = await request.json();

    if (!id || !floorLabel) {
      return NextResponse.json({ success: false, message: 'Eksik parametreler.' }, { status: 400 });
    }
    
    const lot = parkingLots.find(l => l.id === id);
    if (!lot) {
        return NextResponse.json({ success: false, message: "İptal edilecek randevu bulunamadı." }, { status: 404 });
    }

    const floor = lot.floors.find(f => f.label === floorLabel);
    if (!floor) {
        return NextResponse.json({ success: false, message: "İptal edilecek kat bulunamadı." }, { status: 404 });
    }
    
    // Aktif randevuyu bul ve temizle
    const reservationIndex = activeReservations.findIndex(res => res.lotId === id && res.floor === floorLabel);
    if (reservationIndex !== -1) {
        // Kontenjanı geri yükle
        floor.free += 1;
        lot.free += 1;
        
        activeReservations.splice(reservationIndex, 1);
        
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ success: false, message: "Aktif randevu bulunamadı." }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Geçersiz istek." }, { status: 500 });
  }
}
