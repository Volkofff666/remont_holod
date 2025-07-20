'use client'

import type React from 'react'
import { Input } from '@/components/ui/input'

interface PhoneInputProps {
	placeholder?: string
	className?: string
	name?: string
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PhoneInput({
	placeholder = '+7 999 999-99-99',
	className,
	name = 'phone',
	value,
	onChange,
}: PhoneInputProps) {
	return (
		<Input
			placeholder={placeholder}
			type='tel'
			value={value}
			onChange={e => {
				console.log('PhoneInput: Raw input=', e.target.value)
				onChange?.(e)
			}}
			className={className}
			name={name}
			maxLength={16}
			required
		/>
	)
}
