'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, ArrowLeft, Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { getProduct } from '@/lib/products'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { cn } from '@/lib/utils'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const product = getProduct(params.id as string)
  const { addItem } = useCart()
  const { isAuthenticated, setRedirectAfterLogin } = useAuth()

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0])
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  if (!product || !selectedVariant) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/shop">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find(v => v.id === variantId)
    if (variant) {
      setSelectedVariant(variant)
      setCurrentImage(0)
      setQuantity(1)
    }
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setRedirectAfterLogin(`/product/${product.id}`)
      router.push('/login')
      return
    }

    if (selectedVariant.stock === 0) return

    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      variantImage: selectedVariant.images[0],
      price: selectedVariant.price,
      salePrice: selectedVariant.salePrice,
      quantity,
      attributes: selectedVariant.attributes,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const images = selectedVariant.images
  const isOnSale = selectedVariant.salePrice !== undefined
  const isOutOfStock = selectedVariant.stock === 0

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
          {/* Back Link */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-secondary">
                <Image
                  src={images[currentImage]}
                  alt={`${product.name} - ${selectedVariant.name}`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {isOnSale && (
                    <span className="bg-foreground text-background px-3 py-1.5 rounded-full text-sm font-medium">
                      Sale
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={cn(
                        'relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-colors',
                        currentImage === index ? 'border-foreground' : 'border-transparent'
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              {/* Category */}
              <span className="text-sm tracking-wider uppercase text-muted-foreground mb-2">
                {product.category}
              </span>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-serif text-foreground mb-4">
                {product.name}
              </h1>

              {/* Availability */}
              <div className="flex items-center gap-2 mb-6">
                <div
                  className={cn(
                    'w-2.5 h-2.5 rounded-full',
                    product.available ? 'bg-green-500' : 'bg-red-500'
                  )}
                />
                <span className="text-sm text-muted-foreground">
                  {product.available ? 'Available' : 'Currently Unavailable'}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Divider */}
              <div className="border-t border-border pt-8 mb-8">
                <h2 className="text-lg font-medium mb-6">Select Variant</h2>

                {/* Variants */}
                <div className="space-y-6">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant.id)}
                      className={cn(
                        'w-full p-4 rounded-2xl border-2 text-left transition-all',
                        selectedVariant.id === variant.id
                          ? 'border-foreground bg-secondary'
                          : 'border-border hover:border-foreground/30'
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={variant.images[0]}
                            alt={variant.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{variant.name}</h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {Object.entries(variant.attributes).map(([key, value]) => (
                                  <span
                                    key={key}
                                    className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-lg"
                                  >
                                    {value}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              {variant.salePrice ? (
                                <>
                                  <div className="font-medium">
                                    EGP {variant.salePrice.toLocaleString()}
                                  </div>
                                  <div className="text-sm text-muted-foreground line-through">
                                    EGP {variant.price.toLocaleString()}
                                  </div>
                                </>
                              ) : (
                                <div className="font-medium">
                                  EGP {variant.price.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 mt-2">
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
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-border rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:bg-secondary transition-colors rounded-l-xl"
                      disabled={isOutOfStock}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                      className="p-4 hover:bg-secondary transition-colors rounded-r-xl"
                      disabled={isOutOfStock || quantity >= selectedVariant.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={cn(
                      'flex-1 h-14 rounded-xl text-base',
                      isAdded
                        ? 'bg-green-600 hover:bg-green-600'
                        : 'bg-foreground hover:bg-foreground/90'
                    )}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Added to Cart
                      </>
                    ) : isOutOfStock ? (
                      'Out of Stock'
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Add to Cart - EGP {((selectedVariant.salePrice || selectedVariant.price) * quantity).toLocaleString()}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
