'use client'

import { useState, useCallback } from 'react'
import { SmartCaptcha } from '@yandex/smart-captcha'

const SITEKEY = 'ysc1_LZ2923LcwVO7V7F7XaGkQZvK87gWYBRdV4etZemlcea6620a'

export default function Captcha() {
	const [token, setToken] = useState('')

	const handleSuccess = useCallback((t: string) => {
		setToken(t)
		// здесь можно разблокировать кнопку формы и т.п.
	}, [])

	return (
		<div className='space-y-2'>
			<SmartCaptcha
				sitekey={SITEKEY}
				language='ru'
				onSuccess={handleSuccess}
				// опционально:
				// shieldPosition="bottom-right"
				// hideShield  // если скрываешь — покажи своё уведомление пользователю
			/>
			{token && (
				<p className='text-xs break-all'>
					Токен: <code>{token}</code>
				</p>
			)}
		</div>
	)
}
