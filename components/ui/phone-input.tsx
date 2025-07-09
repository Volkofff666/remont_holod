"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { usePhoneFormat } from "@/hooks/usePhoneFormat"
import { useEffect } from "react"

interface PhoneInputProps {
  placeholder?: string
  className?: string
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PhoneInput({
  placeholder = "+7 999 999-99-99",
  className,
  name = "phone",
  value,
  onChange,
}: PhoneInputProps) {
  const { phoneValue, handlePhoneChange, setPhoneValue } = usePhoneFormat()

  // Синхронизация с внешним состоянием
  useEffect(() => {
    if (value !== undefined && value !== phoneValue) {
      setPhoneValue(value)
    }
  }, [value, phoneValue, setPhoneValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePhoneChange(e)
    if (onChange) {
      // Создаем новый event с отформатированным значением
      const formattedEvent = {
        ...e,
        target: {
          ...e.target,
          value: e.target.value,
        },
      }
      onChange(formattedEvent)
    }
  }

  return (
    <Input
      placeholder={placeholder}
      type="tel"
      value={value !== undefined ? value : phoneValue}
      onChange={handleChange}
      className={className}
      name={name}
    />
  )
}
