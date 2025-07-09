interface TelegramMessage {
	name: string
	phone: string
	source: string
}

export async function sendToTelegram({ name, phone, source }: TelegramMessage) {
	const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
	const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

	if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
		console.error('Telegram credentials not configured')
		return { success: false, error: 'Telegram not configured' }
	}

	const message = `🔧 Новая заявка на ремонт холодильника!

👤 Имя: ${name}
📞 Телефон: ${phone}
📍 Источник: ${source}
⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}

#новая_заявка #ремонт_холодильников`

	try {
		const response = await fetch(
			`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: TELEGRAM_CHAT_ID,
					text: message,
					parse_mode: 'HTML',
				}),
			}
		)

		if (!response.ok) {
			throw new Error(`Telegram API error: ${response.status}`)
		}

		return { success: true }
	} catch (error) {
		console.error('Error sending to Telegram:', error)
		return { success: false, error: 'Failed to send message' }
	}
}
// Для теста в консоли:
;(window as any).sendToTelegram = sendToTelegram
