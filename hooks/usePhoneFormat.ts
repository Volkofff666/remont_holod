"use client"

import { useState, type ChangeEvent } from "react"

export function usePhoneFormat() {
  const [phoneValue, setPhoneValue] = useState("")

  const formatPhoneNumber = (value: string): string => {
    // Удаляем все символы кроме цифр
    const numbers = value.replace(/\D/g, "")

    // Если начинается с 8, заменяем на 7
    let formattedNumbers = numbers
    if (numbers.startsWith("8")) {
      formattedNumbers = "7" + numbers.slice(1)
    }

    // Если не начинается с 7, добавляем 7
    if (!formattedNumbers.startsWith("7") && formattedNumbers.length > 0) {
      formattedNumbers = "7" + formattedNumbers
    }

    // Ограничиваем до 11 цифр (7 + 10 цифр номера)
    formattedNumbers = formattedNumbers.slice(0, 11)

    // Форматируем в +7 999 999-99-99
    if (formattedNumbers.length === 0) return ""
    if (formattedNumbers.length === 1) return "+7"
    if (formattedNumbers.length <= 4) return `+7 ${formattedNumbers.slice(1)}`
    if (formattedNumbers.length <= 7) return `+7 ${formattedNumbers.slice(1, 4)} ${formattedNumbers.slice(4)}`
    if (formattedNumbers.length <= 9)
      return `+7 ${formattedNumbers.slice(1, 4)} ${formattedNumbers.slice(4, 7)}-${formattedNumbers.slice(7)}`
    return `+7 ${formattedNumbers.slice(1, 4)} ${formattedNumbers.slice(4, 7)}-${formattedNumbers.slice(7, 9)}-${formattedNumbers.slice(9)}`
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneValue(formatted)
  }

  return {
    phoneValue,
    handlePhoneChange,
    setPhoneValue,
  }
}
