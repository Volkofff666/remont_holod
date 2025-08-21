'use client'

import React, { useCallback, useEffect, useState } from 'react'
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
	/** Управление показом задания извне */
	visible: boolean
	onClose?: () => void

	/** Колбэки событий */
	onToken: (token: string) => void
	onTokenExpired?: () => void
	onStatusChange?: (
		s:
			| 'visible'
			| 'hidden'
			| 'success'
			| 'token-expired'
			| 'network-error'
			| 'javascript-error'
	) => void
}

// Только клиентский рендер, чтобы избежать SSR-ошибок
const InvisibleSmartCaptcha = dynamic(
	() => import('@yandex/smart-captcha').then(m => m.InvisibleSmartCaptcha),
	{ ssr: false }
)

export default function InvisibleCaptcha({
	sitekey,
	language = 'ru',
	test,
	hideShield,
	shieldPosition = 'bottom-right',
	visible,
	onClose,
	onToken,
	onTokenExpired,
	onStatusChange,
}: Props) {
	const [isVisible, setIsVisible] = useState(visible)
	useEffect(() => setIsVisible(visible), [visible])

	const handleHidden = useCallback(() => {
		setIsVisible(false)
		onStatusChange?.('hidden')
		onClose?.()
	}, [onClose, onStatusChange])

	return (
		<InvisibleSmartCaptcha
			sitekey={sitekey}
			language={language}
			test={test}
			hideShield={hideShield}
			shieldPosition={shieldPosition}
			visible={isVisible}
			onChallengeVisible={() => onStatusChange?.('visible')}
			onChallengeHidden={handleHidden}
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
	)
}
