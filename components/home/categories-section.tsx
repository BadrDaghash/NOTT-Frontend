'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/products'

export function CategoriesSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#212121]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-[#f9e7cf]/60">
            Browse By
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-4 text-white">
            Categories
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/shop?category=${category.slug}`}
                className="group block relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/90 via-[#212121]/30 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl lg:text-2xl font-serif text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2 hidden lg:block">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#f9e7cf]">
                    <span className="text-sm tracking-wider uppercase">
                      Explore
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
