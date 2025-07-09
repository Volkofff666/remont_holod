"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "Сколько длится ремонт?",
    answer: "В среднем — 1–2 часа. Почти 80% неисправностей устраняются на месте за 1 визит.",
  },
  {
    id: 2,
    question: "А если мастер не приедет?",
    answer: "Мы работаем по графику. В случае задержки — сообщаем заранее.",
  },
  {
    id: 3,
    question: "Вы работаете с юрлицами?",
    answer: "Да. Обслуживаем бизнес, предоставляем документы, заключаем договор.",
  },
  {
    id: 4,
    question: "Какие марки холодильников вы ремонтируете?",
    answer:
      "Ремонтируем холодильники всех популярных марок: Samsung, LG, Bosch, Indesit, Ariston, Atlant, Stinol и многие другие.",
  },
  {
    id: 5,
    question: "Предоставляете ли вы гарантию на запчасти?",
    answer:
      "Да, на все оригинальные запчасти предоставляется гарантия от 6 до 12 месяцев в зависимости от типа детали.",
  },
  {
    id: 6,
    question: "Можно ли вызвать мастера в выходные?",
    answer: "Да, мы работаем без выходных с 8:00 до 22:00. Стоимость выезда в выходные дни не отличается от будних.",
  },
]

export function FAQAccordion() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqItems.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-0">
            <button
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => toggleItem(item.id)}
            >
              <h3 className="font-semibold text-gray-900">{item.question}</h3>
              <ChevronDown
                className={`text-gray-500 transition-transform duration-200 ${
                  openItems.includes(item.id) ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openItems.includes(item.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
