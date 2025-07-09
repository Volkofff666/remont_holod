import { ImageSlider } from "@/components/ui/image-slider"

export function GallerySection() {
  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Наши работы</h2>
        <ImageSlider />
      </div>
    </section>
  )
}
