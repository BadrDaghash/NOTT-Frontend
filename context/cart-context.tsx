'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage: string
  variantId: string
  variantName: string
  variantImage: string
  price: number
  salePrice?: number
  quantity: number
  attributes: Record<string, string>
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  address: {
    street: string
    line2?: string
    city: string
    state: string
  }
  paymentMethod: 'cod' | 'instapay'
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  voucher: string | null
  discount: number
  applyVoucher: (code: string) => boolean
  removeVoucher: () => void
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const DEMO_VOUCHERS: Record<string, number> = {
  'NOTT10': 0.10,
  'NOTT20': 0.20,
  'WELCOME': 0.15,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [voucher, setVoucher] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('nott_cart')
    const savedOrders = localStorage.getItem('nott_orders')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('nott_cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem('nott_orders', JSON.stringify(orders))
  }, [orders])

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const existingItem = items.find(
      i => i.variantId === item.variantId
    )

    if (existingItem) {
      setItems(items.map(i =>
        i.variantId === item.variantId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      ))
    } else {
      setItems([...items, { ...item, id: Date.now().toString() }])
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setItems([])
    setVoucher(null)
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = items.reduce((sum, item) => {
    const price = item.salePrice || item.price
    return sum + price * item.quantity
  }, 0)

  const discount = voucher && DEMO_VOUCHERS[voucher] 
    ? subtotal * DEMO_VOUCHERS[voucher] 
    : 0

  const applyVoucher = (code: string): boolean => {
    const upperCode = code.toUpperCase()
    if (DEMO_VOUCHERS[upperCode]) {
      setVoucher(upperCode)
      return true
    }
    return false
  }

  const removeVoucher = () => {
    setVoucher(null)
  }

  const addOrder = (order: Omit<Order, 'id' | 'createdAt'>): string => {
    const newOrder: Order = {
      ...order,
      id: `NOTT-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    setOrders(prev => [newOrder, ...prev])
    return newOrder.id
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        voucher,
        discount,
        applyVoucher,
        removeVoucher,
        orders,
        addOrder
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
