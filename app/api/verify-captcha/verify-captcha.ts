export type VerifyResult = {
	status: 'ok' | 'failed'
	message?: string
	host?: string
}

export async function verifyCaptchaDirect(
	token: string,
	ip?: string | null
): Promise<VerifyResult> {
	const secret = process.env.YC_CAPTCHA_SECRET!
	const body = new URLSearchParams({ secret, token, ...(ip ? { ip } : {}) })

	const res = await fetch('https://smartcaptcha.yandexcloud.net/validate', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
		cache: 'no-store',
	})

	if (!res.ok) return { status: 'failed', message: `HTTP ${res.status}` }
	return (await res.json()) as VerifyResult
}
