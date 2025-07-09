"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { useState } from "react"

export function HeroForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          source: "Hero форма",
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert("Заявка отправлена! Мы свяжемся с вами в течение 5 минут.")
        setName("")
        setPhone("")
      } else {
        alert("Ошибка отправки заявки. Попробуйте еще раз или позвоните нам.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Ошибка отправки заявки. Попробуйте еще раз или позвоните нам.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
      <p className="text-lg font-semibold mb-4">Оставьте заявку сейчас — получите скидку 10%</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white text-gray-900 placeholder:text-gray-500"
          required
        />
        <PhoneInput
          placeholder="+7 999 999-99-99"
          className="bg-white text-gray-900 placeholder:text-gray-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Button
          type="submit"
          size="lg"
          className="w-full bg-white text-blue-600 hover:bg-gray-100 disabled:opacity-50"
          disabled={isSubmitting || !name.trim() || !phone.trim()}
        >
          {isSubmitting ? "Отправляем..." : "Вызвать мастера"}
        </Button>
      </form>
      <p className="text-xs text-blue-100 mt-2">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
    </div>
  )
}
