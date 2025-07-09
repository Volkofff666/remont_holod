import { Card, CardContent } from "@/components/ui/card"
import { Shield, Receipt, RotateCcw, Settings, GraduationCap, X } from "lucide-react"

const guarantees = [
  {
    icon: Shield,
    title: "Официальная гарантия",
    description: "до 12 месяцев",
  },
  {
    icon: Receipt,
    title: "Документы",
    description: "гарантийный талон и чек после ремонта",
  },
  {
    icon: RotateCcw,
    title: "Повторный ремонт",
    description: "бесплатно в случае повторной поломки",
  },
  {
    icon: Settings,
    title: "Оригинальные комплектующие",
    description: "используем только проверенные запчасти",
  },
  {
    icon: GraduationCap,
    title: "Квалифицированные мастера",
    description: "с профильным образованием и сертификатами",
  },
  {
    icon: X,
    title: "Честность",
    description: "без навязанных услуг и скрытых платежей",
  },
]

export function GuaranteesSection() {
  return (
    <section id="guarantees" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Гарантии и честность</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guarantees.map((guarantee, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <guarantee.icon className="text-blue-600 mx-auto mb-4" size={48} />
                <h3 className="font-semibold mb-2">{guarantee.title}</h3>
                <p className="text-gray-600">{guarantee.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
