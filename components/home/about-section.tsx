'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AboutSection() {
  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop"
                alt="NOTT Artisan at work"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary rounded-full hidden lg:block" />
            <div className="absolute -top-8 -left-8 w-24 h-24 border-2 border-foreground/10 rounded-full hidden lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              Our Story
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-4 mb-8 text-foreground leading-tight">
              Crafting Beauty,{' '}
              <span className="text-[#212121]/60">One Stitch at a Time</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                NOTT was born from a deep appreciation for the art of crochet and a 
                desire to create something truly meaningful. What began as a personal 
                passion has blossomed into a celebration of handmade craftsmanship.
              </p>
              <p>
                Each piece in our collection is meticulously crafted by skilled artisans 
                who pour their heart and soul into every stitch. We believe in slow 
                fashion - creating timeless pieces that tell a story and stand the test 
                of time.
              </p>
              <p>
                Our commitment to quality extends beyond our products. We source 
                sustainable materials, support fair wages, and honor traditional 
                techniques while embracing modern design sensibilities.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
              >
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-foreground"
              >
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-12 border-t border-border grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl lg:text-4xl font-serif text-foreground">100+</div>
                <div className="text-sm text-muted-foreground mt-1">Unique Designs</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-serif text-foreground">5K+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-serif text-foreground">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Handmade</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
