'use client'

import React, { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

type Props = {
	sitekey: string
	language?: 'ru' | 'en' | 'be' | 'kk' | 'tt' | 'uk' | 'uz' | 'tr'
	test?: boolean
	hideShield?: boolean
	shieldPosition?:
		| 'top-left'
		| 'center-left'
		| 'bottom-left'
		| 'top-right'
		| 'center-right'
		| 'bottom-right'
	className?: string
	onToken: (token: string) => void
	onTokenExpired?: () => void
	onStatusChange?: (
		status:
			| 'visible'
			| 'hidden'
			| 'success'
			| 'token-expired'
			| 'network-error'
			| 'javascript-error'
	) => void
}

// отключаем SSR, чтобы виджет рендерился только на клиенте
const SmartCaptcha = dynamic(
	() => import('@yandex/smart-captcha').then(m => m.SmartCaptcha),
	{ ssr: false }
)

export default function Captcha({
	sitekey,
	language = 'ru',
	test,
	hideShield,
	shieldPosition = 'bottom-right',
	className,
	onToken,
	onTokenExpired,
	onStatusChange,
}: Props) {
	// reset через смену key
	const [resetKey, setResetKey] = useState(0)
	const reset = useCallback(() => setResetKey(k => k + 1), [])
	;(globalThis as any).__resetCaptcha = reset

	return (
		<div className={className} key={resetKey}>
			<SmartCaptcha
				sitekey={sitekey}
				language={language}
				test={test}
				hideShield={hideShield}
				shieldPosition={shieldPosition}
				onChallengeVisible={() => onStatusChange?.('visible')}
				onChallengeHidden={() => onStatusChange?.('hidden')}
				onSuccess={(t: string) => {
					onStatusChange?.('success')
					onToken(t)
				}}
				onTokenExpired={() => {
					onStatusChange?.('token-expired')
					onTokenExpired?.()
				}}
				onNetworkError={() => onStatusChange?.('network-error')}
				onJavascriptError={() => onStatusChange?.('javascript-error')}
			/>
		</div>
	)
}
