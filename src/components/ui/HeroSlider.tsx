'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    id: 1,
    image: '/src/assets/images/hero-1.jpg',
    title: 'Khô Gà Lá Chanh',
    description: 'Đặc sản miền Tây Nam Bộ, vị ngon đậm đà',
    buttonText: 'Mua ngay',
    buttonLink: '/san-pham/kho-ga',
  },
  {
    id: 2,
    image: '/src/assets/images/hero-2.jpg',
    title: 'Khô Bò Miếng',
    description: 'Thơm ngon, bổ dưỡng, ăn vặt lý tưởng',
    buttonText: 'Khám phá',
    buttonLink: '/san-pham/kho-bo',
  },
  {
    id: 3,
    image: '/src/assets/images/hero-3.jpg',
    title: 'Combo Đồ Ăn Vặt',
    description: 'Tiết kiệm hơn với combo đa dạng',
    buttonText: 'Xem ngay',
    buttonLink: '/san-pham/combo',
  },
]

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Placeholder images for development
  const placeholderImages = [
    'https://placehold.co/1200x500/E53935/FFFFFF?text=Khô+Gà+Lá+Chanh',
    'https://placehold.co/1200x500/FBC02D/212121?text=Khô+Bò+Miếng',
    'https://placehold.co/1200x500/FF7043/FFFFFF?text=Combo+Đồ+Ăn+Vặt',
  ]

  return (
    <div className="relative h-[400px] overflow-hidden md:h-[500px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="absolute inset-0 z-10 bg-black/30" />
          <img
            src={placeholderImages[index] || '/placeholder.svg'}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">{slide.title}</h2>
            <p className="mb-6 max-w-2xl text-lg text-white md:text-xl">{slide.description}</p>
            <Link
              to={slide.buttonLink}
              className="bg-orange rounded-full px-6 py-3 font-bold text-white transition-colors hover:bg-orange-700"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      <div className="absolute right-0 bottom-4 left-0 z-30 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
