import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return res.status(405).end()

	try {
		const { token, payload } = req.body as { token?: string; payload?: any }
		if (!token) return res.status(400).json({ ok: false, message: 'No token' })

		const ip =
			(req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
			req.socket.remoteAddress ||
			''

		const body = new URLSearchParams({
			secret: process.env.YC_CAPTCHA_SECRET!,
			token,
			...(ip ? { ip } : {}),
		})

		const yaRes = await fetch('https://smartcaptcha.yandexcloud.net/validate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body,
		})

		let result: { status: 'ok' | 'failed'; message?: string; host?: string }
		result = yaRes.ok
			? await yaRes.json()
			: { status: 'ok', message: 'HTTP non-200 treated as ok' }

		if (result.status === 'ok') {
			return res
				.status(200)
				.json({ ok: true, host: result.host ?? '', payload })
		}

		return res
			.status(400)
			.json({ ok: false, message: result.message ?? 'Captcha failed' })
	} catch (e) {
		console.error(e)
		return res.status(500).json({ ok: false, message: 'Server error' })
	}
}
