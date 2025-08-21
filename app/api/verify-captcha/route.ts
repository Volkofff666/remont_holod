import { NextRequest, NextResponse } from 'next/server'
import { verifyCaptchaDirect } from './verify-captcha'

export async function POST(req: NextRequest) {
	try {
		const { token, payload } = await req.json()

		if (!token) {
			return NextResponse.json(
				{ ok: false, message: 'No token' },
				{ status: 400 }
			)
		}

		const ip =
			req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			// @ts-ignore
			req.ip ||
			''

		const result = await verifyCaptchaDirect(token, ip)

		if (result.status === 'ok') {
			return NextResponse.json({ ok: true, host: result.host ?? '', payload })
		}

		return NextResponse.json(
			{ ok: false, message: result.message ?? 'Captcha failed' },
			{ status: 400 }
		)
	} catch (e) {
		console.error('Captcha verify error', e)
		return NextResponse.json(
			{ ok: false, message: 'Server error' },
			{ status: 500 }
		)
	}
}
