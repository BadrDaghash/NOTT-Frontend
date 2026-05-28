'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { products, categories, getAllVariants } from '@/lib/products'
import { VariantCard } from '@/components/shop/variant-card'

const ITEMS_PER_PAGE_OPTIONS = [8, 12, 16, 24]

function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly, setOnSaleOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState({
    product: true,
    price: true,
    availability: true,
  })

  const allVariants = useMemo(() => getAllVariants(), [])

  const filteredVariants = useMemo(() => {
    let result = allVariants

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(v =>
        v.product.name.toLowerCase().includes(searchLower) ||
        v.name.toLowerCase().includes(searchLower) ||
        v.product.category.toLowerCase().includes(searchLower)
      )
    }

    // Product filter
    if (selectedProduct) {
      result = result.filter(v => v.product.id === selectedProduct)
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(v => v.product.categorySlug === selectedCategory)
    }

    // Price filter
    if (minPrice) {
      result = result.filter(v => (v.salePrice || v.price) >= parseInt(minPrice))
    }
    if (maxPrice) {
      result = result.filter(v => (v.salePrice || v.price) <= parseInt(maxPrice))
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter(v => v.stock > 0)
    }

    // On sale filter
    if (onSaleOnly) {
      result = result.filter(v => v.salePrice !== undefined)
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'name':
        result.sort((a, b) => a.product.name.localeCompare(b.product.name))
        break
      default:
        // newest - keep original order
        break
    }

    return result
  }, [allVariants, search, selectedProduct, selectedCategory, minPrice, maxPrice, inStockOnly, onSaleOnly, sortBy])

  const totalPages = Math.ceil(filteredVariants.length / itemsPerPage)
  const paginatedVariants = filteredVariants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const clearFilters = () => {
    setSearch('')
    setSelectedProduct('')
    setSelectedCategory('')
    setMinPrice('')
    setMaxPrice('')
    setInStockOnly(false)
    setOnSaleOnly(false)
    setCurrentPage(1)
  }

  const hasActiveFilters = search || selectedProduct || selectedCategory || minPrice || maxPrice || inStockOnly || onSaleOnly

  const FilterSection = ({ title, isExpanded, onToggle, children }: { 
    title: string
    isExpanded: boolean
    onToggle: () => void
    children: React.ReactNode 
  }) => (
    <div className="border-b border-border pb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <span className="text-sm font-medium uppercase tracking-wider">{title}</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const FiltersContent = () => (
    <div className="space-y-6">
      <FilterSection
        title="Product"
        isExpanded={expandedFilters.product}
        onToggle={() => setExpandedFilters(prev => ({ ...prev, product: !prev.product }))}
      >
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Category</Label>
            <Select value={selectedCategory} onValueChange={(v) => { setSelectedCategory(v); setCurrentPage(1); }}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Product</Label>
            <Select value={selectedProduct} onValueChange={(v) => { setSelectedProduct(v); setCurrentPage(1); }}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {products.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterSection>

      <FilterSection
        title="Price"
        isExpanded={expandedFilters.price}
        onToggle={() => setExpandedFilters(prev => ({ ...prev, price: !prev.price }))}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Min (EGP)</Label>
            <Input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Max (EGP)</Label>
            <Input
              type="number"
              placeholder="5000"
              value={maxPrice}
              onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
              className="rounded-xl"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection
        title="Availability"
        isExpanded={expandedFilters.availability}
        onToggle={() => setExpandedFilters(prev => ({ ...prev, availability: !prev.availability }))}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id="inStock"
              checked={inStockOnly}
              onCheckedChange={(checked) => { setInStockOnly(!!checked); setCurrentPage(1); }}
            />
            <Label htmlFor="inStock" className="text-sm cursor-pointer">In Stock Only</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="onSale"
              checked={onSaleOnly}
              onCheckedChange={(checked) => { setOnSaleOnly(!!checked); setCurrentPage(1); }}
            />
            <Label htmlFor="onSale" className="text-sm cursor-pointer">On Sale</Label>
          </div>
        </div>
      </FilterSection>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full rounded-xl"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Page Header */}
        <div className="bg-[#212121] py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4"
            >
              Shop Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/60 max-w-lg mx-auto"
            >
              Discover our handcrafted pieces, each one unique and made with love
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          {/* Top Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="pl-12 h-12 rounded-xl"
              />
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] h-12 rounded-xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-12 rounded-xl">
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 w-2 h-2 bg-foreground rounded-full" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 overflow-y-auto h-[calc(100%-80px)]">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">Filters</h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <FiltersContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedVariants.length} of {filteredVariants.length} products
                </p>
                <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(parseInt(v)); setCurrentPage(1); }}>
                  <SelectTrigger className="w-24 h-9 rounded-lg text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEMS_PER_PAGE_OPTIONS.map(n => (
                      <SelectItem key={n} value={n.toString()}>{n} items</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {paginatedVariants.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {paginatedVariants.map((variant, index) => (
                      <motion.div
                        key={variant.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <VariantCard variant={variant} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-xl"
                      >
                        Previous
                      </Button>
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'ghost'}
                            onClick={() => setCurrentPage(page)}
                            className="w-10 h-10 rounded-xl"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-xl"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button variant="outline" onClick={clearFilters} className="rounded-xl">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
