import { type NextRequest, NextResponse } from 'next/server'
import { sendToTelegram } from '@/lib/telegram'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
	try {
		const contentType = request.headers.get('content-type') || ''

		let name = ''
		let phone = ''
		let source = 'Сайт'
		let captchaToken = '' // <-- добавлено

		if (contentType.includes('application/json')) {
			const body = await request.json()
			name = body.name || ''
			phone = body.phone || ''
			source = body.source || 'Сайт'
			captchaToken = body.captchaToken || '' // <-- добавлено
		} else {
			const formData = await request.formData()
			name = formData.get('name')?.toString() || ''
			phone = formData.get('phone')?.toString() || ''
			source = formData.get('source')?.toString() || 'Сайт'
			captchaToken = formData.get('captchaToken')?.toString() || '' // <-- добавлено
		}

		// 0) Проверка токена капчи до остальной логики
		if (!captchaToken) {
			return NextResponse.json(
				{ success: false, error: 'Captcha token is required' },
				{ status: 400 }
			)
		}

		// Попробуем определить IP пользователя (улучшает проверку)
		const ip =
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			// @ts-ignore: ip может отсутствовать в типах NextRequest
			(request as any).ip ||
			''

		// Запрос на валидацию токена
		const body = new URLSearchParams({
			secret: process.env.YC_CAPTCHA_SECRET!,
			token: captchaToken,
			...(ip ? { ip } : {}),
		})

		const yaRes = await fetch('https://smartcaptcha.yandexcloud.net/validate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body,
			cache: 'no-store',
		})

		if (!yaRes.ok) {
			return NextResponse.json(
				{ success: false, error: 'Captcha service unavailable' },
				{ status: 502 }
			)
		}

		const verify = (await yaRes.json()) as {
			status: 'ok' | 'failed'
			message?: string
		}
		if (verify.status !== 'ok') {
			return NextResponse.json(
				{ success: false, error: verify.message || 'Captcha failed' },
				{ status: 400 }
			)
		}

		// 1) Ваши проверки, как были
		if (!name || !phone) {
			return NextResponse.json(
				{ success: false, error: 'Имя и телефон обязательны' },
				{ status: 400 }
			)
		}

		const normalizedPhone = phone.replace(/[\s()-]/g, '')
		const phoneRegex = /^\+?\d{10,15}$/
		if (!phoneRegex.test(normalizedPhone)) {
			return NextResponse.json(
				{ success: false, error: 'Некорректный формат телефона' },
				{ status: 400 }
			)
		}

		// 2) Ваша логика отправки в Telegram
		const telegramResult = await sendToTelegram({
			name,
			phone: normalizedPhone,
			source,
		})

		if (!telegramResult.success) {
			return NextResponse.json(
				{
					success: false,
					error: telegramResult.error || 'Ошибка Telegram',
				},
				{ status: 500 }
			)
		}

		return NextResponse.json({
			success: true,
			message: 'Заявка успешно отправлена',
		})
	} catch (error) {
		console.error('Form submission error:', error)
		return NextResponse.json(
			{ success: false, error: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}

export async function GET() {
	return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}
