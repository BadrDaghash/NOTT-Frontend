'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  User,
  MapPin,
  Package,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth, Address } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'
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

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout, updateUser, addAddress, updateAddress, deleteAddress } = useAuth()
  const { orders } = useCart()

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [addressForm, setAddressForm] = useState({
    street: '',
    line2: '',
    city: '',
    state: '',
    isDefault: false,
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/profile')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      })
    }
  }, [user])

  const handleUpdateProfile = () => {
    updateUser(editForm)
    setIsEditing(false)
  }

  const handleSaveAddress = () => {
    if (!addressForm.street || !addressForm.city || !addressForm.state) return

    if (editingAddress) {
      updateAddress(editingAddress.id, addressForm)
    } else {
      addAddress(addressForm)
    }
    resetAddressForm()
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setAddressForm({
      street: address.street,
      line2: address.line2 || '',
      city: address.city,
      state: address.state,
      isDefault: address.isDefault,
    })
    setShowAddressForm(true)
  }

  const resetAddressForm = () => {
    setShowAddressForm(false)
    setEditingAddress(null)
    setAddressForm({
      street: '',
      line2: '',
      city: '',
      state: '',
      isDefault: false,
    })
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-serif">My Account</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back, {user.firstName}!
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>

            <Tabs defaultValue="profile" className="space-y-8">
              <TabsList className="bg-secondary rounded-xl p-1 h-auto flex-wrap">
                <TabsTrigger
                  value="profile"
                  className="rounded-lg data-[state=active]:bg-background px-4 py-2.5"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="addresses"
                  className="rounded-lg data-[state=active]:bg-background px-4 py-2.5"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Addresses
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="rounded-lg data-[state=active]:bg-background px-4 py-2.5"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Orders
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">Personal Information</h2>
                    {!isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="rounded-xl"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={editForm.firstName}
                            onChange={(e) =>
                              setEditForm({ ...editForm, firstName: e.target.value })
                            }
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={editForm.lastName}
                            onChange={(e) =>
                              setEditForm({ ...editForm, lastName: e.target.value })
                            }
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editForm.phone}
                          onChange={(e) =>
                            setEditForm({ ...editForm, phone: e.target.value })
                          }
                          className="rounded-xl"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="rounded-xl"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleUpdateProfile}
                          className="rounded-xl bg-foreground hover:bg-foreground/90"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">First Name</p>
                          <p className="font-medium">{user.firstName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Name</p>
                          <p className="font-medium">{user.lastName}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Username</p>
                        <p className="font-medium">@{user.username}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="space-y-6">
                {showAddressForm ? (
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-medium mb-6">
                      {editingAddress ? 'Edit Address' : 'Add New Address'}
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          placeholder="Enter your street address"
                          value={addressForm.street}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, street: e.target.value })
                          }
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="line2">Apartment, suite, etc. (optional)</Label>
                        <Input
                          id="line2"
                          placeholder="Apt, Suite, Building"
                          value={addressForm.line2}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, line2: e.target.value })
                          }
                          className="rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Select
                            value={addressForm.city}
                            onValueChange={(value) =>
                              setAddressForm({ ...addressForm, city: value })
                            }
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
                            value={addressForm.state}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, state: e.target.value })
                            }
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="default"
                          checked={addressForm.isDefault}
                          onCheckedChange={(checked) =>
                            setAddressForm({ ...addressForm, isDefault: !!checked })
                          }
                        />
                        <Label htmlFor="default" className="cursor-pointer">
                          Set as default address
                        </Label>
                      </div>
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          onClick={resetAddressForm}
                          className="rounded-xl"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveAddress}
                          className="rounded-xl bg-foreground hover:bg-foreground/90"
                        >
                          {editingAddress ? 'Update Address' : 'Add Address'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {user.addresses.length > 0 ? (
                      <div className="space-y-4">
                        {user.addresses.map((address) => (
                          <div
                            key={address.id}
                            className="flex items-start justify-between p-4 bg-card rounded-2xl border border-border"
                          >
                            <div className="flex items-start gap-4">
                              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                              <div>
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
                                <p className="text-sm text-muted-foreground">
                                  {address.state}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditAddress(address)}
                                className="h-8 w-8"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteAddress(address.id)}
                                className="h-8 w-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-card rounded-2xl border border-border">
                        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Addresses Yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Add a delivery address to speed up checkout
                        </p>
                      </div>
                    )}
                    <Button
                      onClick={() => setShowAddressForm(true)}
                      className="rounded-xl bg-foreground hover:bg-foreground/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Address
                    </Button>
                  </>
                )}
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Link
                        key={order.id}
                        href={`/profile/orders/${order.id}`}
                        className="block p-4 bg-card rounded-2xl border border-border hover:border-foreground/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className={cn(
                                'px-3 py-1 rounded-full text-xs font-medium capitalize',
                                order.status === 'delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'processing'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              )}
                            >
                              {order.status}
                            </span>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </p>
                          <p className="font-medium">EGP {order.total.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-2xl border border-border">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start shopping to see your orders here
                    </p>
                    <Button asChild className="rounded-xl bg-foreground hover:bg-foreground/90">
                      <Link href="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
