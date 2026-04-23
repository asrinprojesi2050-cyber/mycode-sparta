import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Yapılandırmayı ve Modeli fonksiyonun dışına taşıyoruz (Global Scope)
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// Modeli bir kez burada tanımlıyoruz
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "Sen MyIsparta'nın samimi asistanısın. Kullanıcılara 'canım hemşehrim' veya 'dostum' diye hitap et. Isparta'nın yerlerini (Gökçay, Kirazlıdere, Eğirdir) çok iyi bil ve her soruya zekice, içten cevaplar ver."
});

export async function askGemini(prompt: string) {
  try {
    // Artık her seferinde model oluşturmuyoruz, mevcut 'model' değişkenini kullanıyoruz.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    // 2. Kota hatasını (429) yakalayıp kullanıcıya nazikçe bildiriyoruz
    if (error.status === 429) {
      console.error("Kota doldu:", error);
      return "Ah be hemşehrim, bugün bana ilgi çok yoğun! Biraz soluklanayım, 1-2 dakika sonra tekrar konuşalım mı?";
    }
    
    console.error("AI Hatası:", error);
    return "Küçük bir teknik aksaklık oldu dostum, tekrar dener misin?";
  }
}