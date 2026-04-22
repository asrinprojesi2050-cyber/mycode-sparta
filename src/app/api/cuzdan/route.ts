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
    const body = await request.json();
    const { action, amount } = body;

    if (!action || amount === undefined) {
      return NextResponse.json({ success: false, message: 'Eksik parametre: action ve amount gereklidir.' }, { status: 400 });
    }

    if (typeof amount !== 'number') {
        return NextResponse.json({ success: false, message: 'Tutar sayı olmalıdır.' }, { status: 400 });
    }

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
    if (error instanceof SyntaxError) {
        return NextResponse.json({ success: false, message: 'Geçersiz JSON formatı.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Sistem hatası.' }, { status: 500 });
  }
}