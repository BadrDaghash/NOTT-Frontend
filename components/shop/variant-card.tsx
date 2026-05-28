'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductVariant, Product } from '@/lib/products'
import { cn } from '@/lib/utils'

interface VariantCardProps {
  variant: ProductVariant & { product: Product }
}

export function VariantCard({ variant }: VariantCardProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const hasMultipleImages = variant.images.length > 1
  const isOnSale = variant.salePrice !== undefined
  const isOutOfStock = variant.stock === 0

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % variant.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + variant.images.length) % variant.images.length)
  }

  return (
    <Link href={`/product/${variant.product.id}`}>
      <motion.div
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-4">
          <Image
            src={variant.images[currentImage]}
            alt={`${variant.product.name} - ${variant.name}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Image Navigation */}
          {hasMultipleImages && isHovered && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Image Dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {variant.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImage(index)
                  }}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all',
                    currentImage === index
                      ? 'bg-white w-4'
                      : 'bg-white/50 hover:bg-white/70'
                  )}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isOnSale && (
              <span className="bg-foreground text-background px-2.5 py-1 rounded-full text-xs font-medium">
                Sale
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-white/90 text-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                Sold Out
              </span>
            )}
          </div>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
            <span className="bg-white text-foreground px-5 py-2.5 rounded-full text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              View Product
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-foreground group-hover:text-foreground/70 transition-colors line-clamp-1">
                {variant.product.name}
              </h3>
              <p className="text-sm text-muted-foreground">{variant.name}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {isOnSale ? (
              <>
                <span className="font-medium text-foreground">
                  EGP {variant.salePrice?.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  EGP {variant.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="font-medium text-foreground">
                EGP {variant.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Attributes */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(variant.attributes).map(([key, value]) => (
              <span
                key={key}
                className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg"
              >
                {value}
              </span>
            ))}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-1.5">
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                variant.stock > 5
                  ? 'bg-green-500'
                  : variant.stock > 0
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              )}
            />
            <span className="text-xs text-muted-foreground">
              {variant.stock > 5
                ? 'In Stock'
                : variant.stock > 0
                ? `Only ${variant.stock} left`
                : 'Out of Stock'}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
