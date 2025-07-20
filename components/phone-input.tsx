'use client'

import type React from 'react'

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
		<input
			placeholder={placeholder}
			type='tel'
			value={value}
			onChange={e => {
				console.log(
					'PhoneInput: Raw input=',
					e.target.value,
					'Length=',
					e.target.value.length
				)
				onChange?.(e)
			}}
			className={`border rounded-md p-2 ${className || ''}`}
			name={name}
			maxLength={14}
			required
		/>
	)
}
