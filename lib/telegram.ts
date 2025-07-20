export async function sendToTelegram({
	name,
	phone,
	source,
}: {
	name: string
	phone: string
	source: string
}) {
	try {
		const botToken = process.env.TELEGRAM_BOT_TOKEN
		const chatId = process.env.TELEGRAM_CHAT_ID

		if (!botToken || !chatId) {
			throw new Error('Missing Telegram bot token or chat ID')
		}

		const message = `
      Новая заявка с сайта:
      Имя: ${name}
      Телефон: ${phone}
      Источник: ${source}
      Время: ${new Date().toLocaleString('ru-RU', {
				timeZone: 'Europe/Moscow',
			})}
    `

		const response = await fetch(
			`https://api.telegram.org/bot${botToken}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: chatId,
					text: message,
					parse_mode: 'Markdown',
				}),
			}
		)

		const result = await response.json()

		if (!result.ok) {
			throw new Error(
				result.description || 'Failed to send message to Telegram'
			)
		}

		return { success: true }
	} catch (error) {
		console.error('Error sending to Telegram:', error)
		return { success: false, error: error.message }
	}
}
