import { type NextRequest, NextResponse } from "next/server"
import { sendToTelegram } from "@/lib/telegram"

export async function POST(request: NextRequest) {
  try {
    const { name, phone, source } = await request.json()

    // Валидация данных
    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Имя и телефон обязательны" }, { status: 400 })
    }

    // Отправка в Telegram
    const telegramResult = await sendToTelegram({
      name,
      phone,
      source: source || "Сайт",
    })

    if (!telegramResult.success) {
      return NextResponse.json({ success: false, error: "Ошибка отправки заявки" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Заявка успешно отправлена" })
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json({ success: false, error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
