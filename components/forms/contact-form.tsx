"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { useState } from "react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "Контактная форма" }),
      })

      const result = await response.json()
      if (result.success) {
        alert("Заявка отправлена! Мы свяжемся с вами в течение 5 минут.")
        e.currentTarget.reset()
      } else {
        alert("Ошибка отправки заявки. Попробуйте еще раз.")
      }
    } catch (error) {
      alert("Ошибка отправки заявки. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Ваше имя" name="name" required />
      <PhoneInput placeholder="+7 999 999-99-99" name="phone" />
      <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправляем..." : "Оставить заявку"}
      </Button>
    </form>
  )
}
