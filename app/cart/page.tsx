'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, subtotal, voucher, discount, applyVoucher, removeVoucher } = useCart()
  const { isAuthenticated, setRedirectAfterLogin } = useAuth()
  const [voucherInput, setVoucherInput] = useState('')
  const [voucherError, setVoucherError] = useState('')

  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal - discount + shipping

  const handleApplyVoucher = () => {
    setVoucherError('')
    if (!voucherInput.trim()) {
      setVoucherError('Please enter a voucher code')
      return
    }
    const success = applyVoucher(voucherInput.trim())
    if (!success) {
      setVoucherError('Invalid voucher code')
    } else {
      setVoucherInput('')
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setRedirectAfterLogin('/checkout')
      router.push('/login')
      return
    }
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-serif mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added any items to your cart yet. Start exploring our collection!
            </p>
            <Button asChild className="rounded-xl bg-foreground hover:bg-foreground/90">
              <Link href="/shop">
                Start Shopping
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-serif mb-8 lg:mb-12"
          >
            Shopping Cart
          </motion.h1>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    layout
                    className="flex gap-4 lg:gap-6 p-4 lg:p-6 bg-card rounded-2xl border border-border"
                  >
                    {/* Images */}
                    <div className="flex gap-2 flex-shrink-0">
                      <div className="relative w-20 h-24 lg:w-24 lg:h-32 rounded-xl overflow-hidden">
                        <Image
                          src={item.variantImage}
                          alt={item.variantName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Link
                            href={`/product/${item.productId}`}
                            className="font-medium text-foreground hover:text-foreground/70 transition-colors"
                          >
                            {item.productName}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.variantName}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Attributes */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(item.attributes).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg"
                          >
                            {value}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-secondary transition-colors rounded-l-lg"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-secondary transition-colors rounded-r-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {item.salePrice ? (
                            <>
                              <div className="font-medium">
                                EGP {(item.salePrice * item.quantity).toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground line-through">
                                EGP {(item.price * item.quantity).toLocaleString()}
                              </div>
                            </>
                          ) : (
                            <div className="font-medium">
                              EGP {(item.price * item.quantity).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 bg-card rounded-2xl border border-border p-6"
              >
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                {/* Voucher Input */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Voucher code"
                        value={voucherInput}
                        onChange={(e) => setVoucherInput(e.target.value)}
                        className="pl-10 rounded-xl"
                        disabled={!!voucher}
                      />
                    </div>
                    {voucher ? (
                      <Button
                        variant="outline"
                        onClick={removeVoucher}
                        className="rounded-xl"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleApplyVoucher}
                        className="rounded-xl"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                  {voucherError && (
                    <p className="text-xs text-destructive mt-2">{voucherError}</p>
                  )}
                  {voucher && (
                    <p className="text-xs text-green-600 mt-2">
                      Voucher &quot;{voucher}&quot; applied!
                    </p>
                  )}
                </div>

                {/* Summary Lines */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>EGP {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-EGP {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `EGP ${shipping}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">
                      Free shipping on orders over EGP 500
                    </p>
                  )}
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium text-lg">
                      EGP {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full h-12 rounded-xl bg-foreground hover:bg-foreground/90"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <Link
                  href="/shop"
                  className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-4"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
