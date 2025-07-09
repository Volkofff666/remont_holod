import { FAQAccordion } from "@/components/ui/faq-accordion"

export function FAQSection() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Частые вопросы</h2>
        <FAQAccordion />
      </div>
    </section>
  )
}
