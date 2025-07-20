export async function sendToTelegram(data: {
	name: string
	phone: string
	source: string
}) {
	try {
		const message = `
🚀 Новая заявка:
Имя: ${data.name}
Телефон: ${data.phone}
Источник: ${data.source}
    `.trim()

		const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
		const CHAT_ID = process.env.TELEGRAM_CHAT_ID!

		const url = `https://api.telegram.org/bot ${TELEGRAM_BOT_TOKEN}/sendMessage`

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: CHAT_ID,
				text: message,
				parse_mode: 'HTML',
			}),
		})

		if (!response.ok) {
			throw new Error('Telegram API error')
		}

		return { success: true }
	} catch (error) {
		console.error('Telegram send error:', error)
		return { success: false, error: 'Не удалось отправить в Telegram' }
	}
}
