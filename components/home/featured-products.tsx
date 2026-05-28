'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/products'
import { Button } from '@/components/ui/button'

export function FeaturedProducts() {
  const products = getFeaturedProducts()

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Our Collection
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-4 text-foreground">
            Featured Pieces
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Discover our most beloved creations, each piece handcrafted with exceptional care
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/product/${product.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                  
                  {/* Quick view button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-white text-foreground px-6 py-3 rounded-full text-sm tracking-wider uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Product
                    </span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-xs tracking-wider uppercase">
                      {product.category}
                    </span>
                  </div>

                  {/* Availability */}
                  {!product.available && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-foreground/80 text-white px-3 py-1.5 rounded-full text-xs tracking-wider uppercase">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground group-hover:text-foreground/70 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-sm font-medium text-foreground">
                      View Details
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-foreground text-foreground hover:bg-foreground hover:text-background"
          >
            <Link href="/shop">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
