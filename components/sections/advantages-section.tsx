import { Card, CardContent } from "@/components/ui/card"
import { Car, Users, Package, Search, FileText, CreditCard } from "lucide-react"

const advantages = [
  {
    icon: Car,
    title: "Срочный выезд",
    description: "по СПб и области — от 15 минут",
  },
  {
    icon: Users,
    title: "Опытные мастера",
    description: "с опытом от 5 лет",
  },
  {
    icon: Package,
    title: "Оригинальные запчасти",
    description: "в наличии",
  },
  {
    icon: Search,
    title: "Бесплатная диагностика",
    description: "при ремонте",
  },
  {
    icon: FileText,
    title: "Гарантия до 12 месяцев",
    description: "на все виды работ",
  },
  {
    icon: CreditCard,
    title: "Оплата после работы",
    description: "выполнения работы",
  },
]

export function AdvantagesSection() {
  return (
    <section id="advantages" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Почему выбирают нас</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <Card key={index} className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <advantage.icon className="text-blue-600 mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
