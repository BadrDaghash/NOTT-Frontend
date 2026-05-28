"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-sm tracking-[0.2em] uppercase text-foreground/60 mb-4 block">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              Crafted with Love,
              <br />
              <span className="italic">Worn with Pride</span>
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              NOTT was born from a passion for preserving the timeless art of crochet 
              while creating contemporary pieces that celebrate individuality and craftsmanship.
            </p>
          </motion.div>
        </section>

        {/* Image & Story Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&auto=format&fit=crop&q=80"
                  alt="Artisan crafting crochet"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <motion.div variants={fadeInUp}>
                  <h2 className="text-3xl md:text-4xl font-light mb-4">The Beginning</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    What started as a small project in 2020 has grown into a beloved brand 
                    that celebrates the beauty of handmade fashion. Each piece we create 
                    tells a story of patience, skill, and an unwavering commitment to quality.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <h2 className="text-3xl md:text-4xl font-light mb-4">Our Philosophy</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We believe in slow fashion - creating pieces that are meant to be treasured, 
                    not discarded. Every stitch is made with intention, every design is created 
                    with purpose. We&apos;re not just making clothes; we&apos;re creating heirlooms.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <h2 className="text-3xl md:text-4xl font-light mb-4">Sustainability</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Our commitment to the environment is woven into everything we do. 
                    We use organic and recycled yarns, minimal packaging, and ensure 
                    our production process leaves the smallest footprint possible.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-accent/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4">Our Values</h2>
              <p className="text-foreground/70 max-w-xl mx-auto">
                The principles that guide every thread we weave
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Authenticity",
                  description: "Each piece is genuinely handcrafted, carrying the unique touch of our artisans. No two items are exactly alike."
                },
                {
                  title: "Quality",
                  description: "We use only the finest materials - organic cotton, premium wool, and sustainable fibers that stand the test of time."
                },
                {
                  title: "Community",
                  description: "We support local artisans and fair trade practices, ensuring everyone in our chain is valued and respected."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-card rounded-3xl p-8 shadow-soft"
                >
                  <span className="text-5xl font-light text-foreground/20 mb-4 block">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4">Meet the Makers</h2>
              <p className="text-foreground/70 max-w-xl mx-auto">
                The talented hands behind every NOTT creation
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Mitchell",
                  role: "Founder & Lead Designer",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
                },
                {
                  name: "Emma Chen",
                  role: "Master Artisan",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80"
                },
                {
                  name: "Maria Santos",
                  role: "Pattern Developer",
                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                }
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="relative aspect-square rounded-3xl overflow-hidden mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-foreground/60">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ready to Experience NOTT?
            </h2>
            <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
              Discover our collection of handcrafted pieces, each one made with 
              love and designed to become a treasured part of your wardrobe.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-foreground/90 transition-colors"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
