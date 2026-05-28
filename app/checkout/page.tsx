'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  CreditCard,
  Truck,
  Check,
  Plus,
  Tag,
  X,
  ChevronRight,
  ArrowLeft,
  Banknote,
  Smartphone,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useCart } from '@/context/cart-context'
import { useAuth, Address } from '@/context/auth-context'
import { cn } from '@/lib/utils'

const EGYPT_CITIES = [
  'Cairo',
  'Alexandria',
  'Giza',
  'Shubra El Kheima',
  'Port Said',
  'Suez',
  'Luxor',
  'Mansoura',
  'Tanta',
  'Asyut',
  'Ismailia',
  'Faiyum',
  'Zagazig',
  'Aswan',
  'Damietta',
  'Damanhur',
  'Minya',
  'Beni Suef',
  'Qena',
  'Sohag',
  'Hurghada',
  'Sharm El Sheikh',
]

type Step = 'address' | 'voucher' | 'summary' | 'payment'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, voucher, discount, applyVoucher, removeVoucher, addOrder, clearCart } = useCart()
  const { user, isAuthenticated, addAddress, isLoading } = useAuth()

  const [currentStep, setCurrentStep] = useState<Step>('address')
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    street: '',
    line2: '',
    city: '',
    state: '',
    isDefault: false,
  })
  const [voucherInput, setVoucherInput] = useState('')
  const [voucherError, setVoucherError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'instapay'>('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState('')

  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal - discount + shipping

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/checkout')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      router.push('/cart')
    }
  }, [items, router, orderComplete])

  useEffect(() => {
    if (user?.addresses?.length) {
      const defaultAddress = user.addresses.find(a => a.isDefault) || user.addresses[0]
      setSelectedAddress(defaultAddress)
    }
  }, [user?.addresses])

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: 'address', label: 'Address', icon: <MapPin className="w-5 h-5" /> },
    { key: 'voucher', label: 'Voucher', icon: <Tag className="w-5 h-5" /> },
    { key: 'summary', label: 'Summary', icon: <Truck className="w-5 h-5" /> },
    { key: 'payment', label: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
  ]

  const stepIndex = steps.findIndex(s => s.key === currentStep)

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.state) return

    addAddress(newAddress)
    setNewAddress({ street: '', line2: '', city: '', state: '', isDefault: false })
    setShowAddressForm(false)
  }

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

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return

    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    const newOrderId = addOrder({
      items: [...items],
      subtotal,
      discount,
      shipping,
      total,
      address: {
        street: selectedAddress.street,
        line2: selectedAddress.line2,
        city: selectedAddress.city,
        state: selectedAddress.state,
      },
      paymentMethod,
      status: 'pending',
    })

    setOrderId(newOrderId)
    clearCart()
    setOrderComplete(true)
    setIsProcessing(false)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'address':
        return !!selectedAddress
      case 'voucher':
        return true
      case 'summary':
        return true
      case 'payment':
        return !!paymentMethod
      default:
        return false
    }
  }

  const nextStep = () => {
    const currentIndex = steps.findIndex(s => s.key === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].key)
    }
  }

  const prevStep = () => {
    const currentIndex = steps.findIndex(s => s.key === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].key)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (orderComplete) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-serif mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your order. Your order number is:
            </p>
            <p className="font-mono text-lg font-medium mb-8">{orderId}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/profile/orders">View Orders</Link>
              </Button>
              <Button asChild className="rounded-xl bg-foreground hover:bg-foreground/90">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
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
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/cart"
              className="p-2 hover:bg-secondary rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl lg:text-3xl font-serif">Checkout</h1>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <button
                    onClick={() => index < stepIndex && setCurrentStep(step.key)}
                    disabled={index > stepIndex}
                    className={cn(
                      'flex flex-col items-center gap-2',
                      index <= stepIndex ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                        index < stepIndex
                          ? 'bg-green-600 text-white'
                          : index === stepIndex
                          ? 'bg-foreground text-background'
                          : 'bg-secondary'
                      )}
                    >
                      {index < stepIndex ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span className="text-xs hidden sm:block">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 mx-2 lg:mx-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Address */}
                {currentStep === 'address' && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-medium">Delivery Address</h2>

                    {user?.addresses && user.addresses.length > 0 && !showAddressForm && (
                      <RadioGroup
                        value={selectedAddress?.id || ''}
                        onValueChange={(value) => {
                          const address = user.addresses.find(a => a.id === value)
                          if (address) setSelectedAddress(address)
                        }}
                        className="space-y-4"
                      >
                        {user.addresses.map((address) => (
                          <Label
                            key={address.id}
                            className={cn(
                              'flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors',
                              selectedAddress?.id === address.id
                                ? 'border-foreground bg-secondary'
                                : 'border-border hover:border-foreground/30'
                            )}
                          >
                            <RadioGroupItem value={address.id} className="mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{address.city}</span>
                                {address.isDefault && (
                                  <span className="text-xs bg-foreground text-background px-2 py-0.5 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {address.street}
                                {address.line2 && `, ${address.line2}`}
                              </p>
                              <p className="text-sm text-muted-foreground">{address.state}</p>
                            </div>
                          </Label>
                        ))}
                      </RadioGroup>
                    )}

                    {(showAddressForm || !user?.addresses?.length) && (
                      <div className="space-y-4 p-6 rounded-2xl border border-border">
                        <div className="space-y-2">
                          <Label htmlFor="street">Street Address</Label>
                          <Input
                            id="street"
                            placeholder="Enter your street address"
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="line2">Apartment, suite, etc. (optional)</Label>
                          <Input
                            id="line2"
                            placeholder="Apt, Suite, Building"
                            value={newAddress.line2}
                            onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Select
                              value={newAddress.city}
                              onValueChange={(value) => setNewAddress({ ...newAddress, city: value })}
                            >
                              <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                              <SelectContent>
                                {EGYPT_CITIES.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Governorate</Label>
                            <Input
                              id="state"
                              placeholder="e.g., Cairo"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                              className="rounded-xl"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="default"
                            checked={newAddress.isDefault}
                            onCheckedChange={(checked) =>
                              setNewAddress({ ...newAddress, isDefault: !!checked })
                            }
                          />
                          <Label htmlFor="default" className="cursor-pointer">
                            Set as default address
                          </Label>
                        </div>
                        <div className="flex gap-4">
                          {user?.addresses?.length ? (
                            <Button
                              variant="outline"
                              onClick={() => setShowAddressForm(false)}
                              className="rounded-xl"
                            >
                              Cancel
                            </Button>
                          ) : null}
                          <Button
                            onClick={handleAddAddress}
                            className="rounded-xl bg-foreground hover:bg-foreground/90"
                          >
                            Save Address
                          </Button>
                        </div>
                      </div>
                    )}

                    {user?.addresses?.length > 0 && !showAddressForm && (
                      <Button
                        variant="outline"
                        onClick={() => setShowAddressForm(true)}
                        className="rounded-xl"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Address
                      </Button>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Voucher */}
                {currentStep === 'voucher' && (
                  <motion.div
                    key="voucher"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-medium">Apply Voucher</h2>
                    <p className="text-muted-foreground">
                      Have a voucher code? Enter it below to get a discount on your order.
                    </p>

                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="Enter voucher code"
                          value={voucherInput}
                          onChange={(e) => setVoucherInput(e.target.value)}
                          className="pl-12 h-12 rounded-xl"
                          disabled={!!voucher}
                        />
                      </div>
                      {voucher ? (
                        <Button
                          variant="outline"
                          onClick={removeVoucher}
                          className="h-12 rounded-xl"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      ) : (
                        <Button
                          onClick={handleApplyVoucher}
                          className="h-12 rounded-xl bg-foreground hover:bg-foreground/90"
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                    {voucherError && (
                      <p className="text-sm text-destructive">{voucherError}</p>
                    )}
                    {voucher && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-green-800">
                          Voucher &quot;{voucher}&quot; applied! You save EGP {discount.toLocaleString()}
                        </p>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground">
                      Try: NOTT10, NOTT20, or WELCOME
                    </p>
                  </motion.div>
                )}

                {/* Step 3: Summary */}
                {currentStep === 'summary' && (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-medium">Order Summary</h2>

                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
                        >
                          <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={item.variantImage}
                              alt={item.variantName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.productName}</h3>
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

                    {selectedAddress && (
                      <div className="p-4 bg-secondary rounded-2xl">
                        <h3 className="font-medium mb-2">Delivery Address</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedAddress.street}
                          {selectedAddress.line2 && `, ${selectedAddress.line2}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedAddress.city}, {selectedAddress.state}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Payment */}
                {currentStep === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-medium">Payment Method</h2>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as 'cod' | 'instapay')}
                      className="space-y-4"
                    >
                      <Label
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors',
                          paymentMethod === 'cod'
                            ? 'border-foreground bg-secondary'
                            : 'border-border hover:border-foreground/30'
                        )}
                      >
                        <RadioGroupItem value="cod" />
                        <Banknote className="w-6 h-6" />
                        <div className="flex-1">
                          <span className="font-medium">Cash on Delivery</span>
                          <p className="text-sm text-muted-foreground">
                            Pay when you receive your order
                          </p>
                        </div>
                      </Label>

                      <Label
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors',
                          paymentMethod === 'instapay'
                            ? 'border-foreground bg-secondary'
                            : 'border-border hover:border-foreground/30'
                        )}
                      >
                        <RadioGroupItem value="instapay" />
                        <Smartphone className="w-6 h-6" />
                        <div className="flex-1">
                          <span className="font-medium">InstaPay</span>
                          <p className="text-sm text-muted-foreground">
                            Pay instantly via InstaPay
                          </p>
                        </div>
                      </Label>
                    </RadioGroup>

                    {paymentMethod === 'instapay' && (
                      <div className="p-4 bg-secondary rounded-2xl">
                        <p className="text-sm text-muted-foreground mb-2">
                          Send payment to:
                        </p>
                        <p className="font-mono text-lg font-medium">01092267497</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Please include your order number in the payment reference.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {stepIndex > 0 && (
                  <Button variant="outline" onClick={prevStep} className="rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                <div className="ml-auto">
                  {currentStep === 'payment' ? (
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={!canProceed() || isProcessing}
                      className="rounded-xl bg-foreground hover:bg-foreground/90 min-w-[160px]"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Place Order
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="rounded-xl bg-foreground hover:bg-foreground/90"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-medium mb-6">Order Total</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal ({items.length} items)
                    </span>
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
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium text-lg">
                      EGP {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
