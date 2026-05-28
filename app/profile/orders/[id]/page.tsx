'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Package, MapPin, CreditCard, Truck } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { cn } from '@/lib/utils'

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { orders } = useCart()

  const order = orders.find(o => o.id === params.id)

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Order Not Found</h1>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/profile">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const statusSteps = ['pending', 'processing', 'shipped', 'delivered']
  const currentStepIndex = statusSteps.indexOf(order.status)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-secondary rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-serif">Order Details</h1>
                <p className="text-muted-foreground mt-1 font-mono">{order.id}</p>
              </div>
            </div>

            {/* Order Status Progress */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-8">
              <h2 className="text-lg font-medium mb-6">Order Status</h2>
              <div className="flex items-center justify-between">
                {statusSteps.map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center',
                          index <= currentStepIndex
                            ? 'bg-green-600 text-white'
                            : 'bg-secondary text-muted-foreground'
                        )}
                      >
                        {index === 0 && <Package className="w-5 h-5" />}
                        {index === 1 && <Truck className="w-5 h-5" />}
                        {index === 2 && <Truck className="w-5 h-5" />}
                        {index === 3 && <Package className="w-5 h-5" />}
                      </div>
                      <span className="text-xs mt-2 capitalize">{step}</span>
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={cn(
                          'w-full h-1 mx-2 rounded hidden sm:block',
                          index < currentStepIndex ? 'bg-green-600' : 'bg-secondary'
                        )}
                        style={{ minWidth: '60px' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Items */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-medium">Items</h2>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
                  >
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.variantImage}
                        alt={item.variantName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.productId}`}
                        className="font-medium hover:text-foreground/70 transition-colors"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.variantName}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        EGP {((item.salePrice || item.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1 space-y-6">
                {/* Delivery Address */}
                <div className="bg-card rounded-2xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-medium">Delivery Address</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.address.street}
                    {order.address.line2 && `, ${order.address.line2}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.address.city}, {order.address.state}
                  </p>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-2xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-medium">Payment Method</h3>
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'InstaPay'}
                  </p>
                </div>

                {/* Order Summary */}
                <div className="bg-card rounded-2xl border border-border p-4">
                  <h3 className="font-medium mb-4">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>EGP {order.subtotal.toLocaleString()}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-EGP {order.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{order.shipping === 0 ? 'Free' : `EGP ${order.shipping}`}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">EGP {order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Order Date */}
                <div className="text-sm text-muted-foreground text-center">
                  Ordered on{' '}
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
