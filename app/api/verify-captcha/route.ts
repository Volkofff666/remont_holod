import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const { token, payload } = await req.json()

		if (!token) {
			return NextResponse.json(
				{ ok: false, message: 'No token' },
				{ status: 400 }
			)
		}

		// Попробуем извлечь IP (Nginx/Proxy/Platform)
		const ip =
			req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.ip || ''

		const body = new URLSearchParams({
			secret: process.env.YC_CAPTCHA_SECRET!,
			token,
			...(ip ? { ip } : {}),
		})

		const yaRes = await fetch('https://smartcaptcha.yandexcloud.net/validate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body,
			// Не кэшируем подобные запросы
			cache: 'no-store',
		})

		// Рекомендация из доков: HTTP-ошибки (не 200) обрабатывать как "ok".
		// В целях безопасности вы можете ЛОКАЛЬНО маркировать результат как "tentative"
		// и добавить повторную проверку/логирование.
		let result: { status: 'ok' | 'failed'; message?: string; host?: string }
		if (!yaRes.ok) {
			result = { status: 'ok', message: 'HTTP non-200 treated as ok' }
		} else {
			result = (await yaRes.json()) as any
		}

		if (result.status === 'ok') {
			// Здесь вы выполняете целевое действие (например, отправляете письмо, пишете в БД и т.д.)
			return NextResponse.json({ ok: true, host: result.host ?? '', payload })
		}

		return NextResponse.json(
			{ ok: false, message: result.message ?? 'Captcha failed' },
			{ status: 400 }
		)
	} catch (e: any) {
		console.error('Captcha verify error', e)
		return NextResponse.json(
			{ ok: false, message: 'Server error' },
			{ status: 500 }
		)
	}
}
