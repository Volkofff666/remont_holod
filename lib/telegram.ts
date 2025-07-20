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
		const botToken = '7660028494:AAH6EHywVxYjtlRKFeFMFTn_E28eTcCYE9I' // Замени на твой токен от BotFather
		const chatIds = ['707196422', '1041230539', '577437701']

		if (!botToken) {
			throw new Error('Missing Telegram bot token')
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

		const sendPromises = chatIds.map(async chatId => {
			const url = `https://api.telegram.org/bot${botToken}/sendMessage`
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: chatId,
					text: message,
					parse_mode: 'Markdown',
				}),
			})

			const result = await response.json()
			if (!result.ok) {
				console.error(
					`Failed to send message to chat ${chatId}:`,
					result.description
				)
				throw new Error(
					`Failed to send message to chat ${chatId}: ${result.description}`
				)
			}
			return result
		})

		await Promise.all(sendPromises)
		return { success: true }
	} catch (error) {
		console.error('Error sending to Telegram:', error)
		return { success: false, error: error.message }
	}
}
