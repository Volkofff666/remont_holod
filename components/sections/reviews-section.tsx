import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    text: "Приехал в течение часа, устранил течь, всё работает идеально. Спасибо!",
    author: "Анна, Приморский р-н",
    rating: 5,
  },
  {
    text: "Думал, всё — сгорел компрессор, но обошлось заменой реле. Быстро, честно, приятно.",
    author: "Владимир, Купчино",
    rating: 5,
  },
  {
    text: "Хорошее отношение, сделали по-человечески. Сохраняю номер.",
    author: "Ирина, Калининский район",
    rating: 5,
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Отзывы наших клиентов</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{review.text}"</p>
                <p className="text-sm text-gray-500">— {review.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-current" size={24} />
            ))}
            <span className="text-xl font-bold">4.9</span>
          </div>
          <p className="text-gray-600">Средняя оценка по Яндекс.Картам</p>
        </div>
      </div>
    </section>
  )
}
