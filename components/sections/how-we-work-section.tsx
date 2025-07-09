const steps = [
  {
    number: 1,
    title: "Оставьте заявку",
    description: "по телефону или на сайте",
  },
  {
    number: 2,
    title: "Мастер приедет к вам",
    description: "проведёт диагностику и согласует стоимость",
  },
  {
    number: 3,
    title: "Ремонт и расчёт",
    description: "устраняем неисправность на месте, выдаём гарантию",
  },
]

export function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Как мы работаем — 3 простых шага</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-8">
          Большинство поломок решаются в течение 1–2 часов. Все работы проводим аккуратно, оставляем порядок после себя.
        </p>
      </div>
    </section>
  )
}
