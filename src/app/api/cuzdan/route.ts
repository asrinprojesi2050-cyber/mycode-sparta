import { NextResponse } from 'next/server';

// Sunucu tarafında cüzdan verilerini tutuyoruz
let walletData = {
  bakiye: 250.00,
  gulPuan: 100
};

export async function GET() {
  return NextResponse.json(walletData);
}

export async function POST(request: Request) {
  try {
    const { action, amount } = await request.json();

    if (action === 'deduct_balance') {
      if (walletData.bakiye >= amount) {
        walletData.bakiye -= amount;
        return NextResponse.json({ success: true, data: walletData });
      }
      return NextResponse.json({ success: false, message: 'Bakiye yetersiz.' }, { status: 400 });
    }

    if (action === 'deduct_points') {
      if (walletData.gulPuan >= amount) {
        walletData.gulPuan -= amount;
        return NextResponse.json({ success: true, data: walletData });
      }
      return NextResponse.json({ success: false, message: 'Gül Puan yetersiz.' }, { status: 400 });
    }

    if (action === 'add_points') {
      walletData.gulPuan += amount;
      return NextResponse.json({ success: true, data: walletData });
    }

    return NextResponse.json({ success: false, message: 'Geçersiz işlem.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Sistem hatası.' }, { status: 500 });
  }
}
