"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Instagram, Facebook } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@nott.com",
    href: "mailto:hello@nott.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567"
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "123 Craft Lane, Brooklyn, NY 11201",
    href: "#"
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri: 9am - 6pm EST",
    href: "#"
  }
]

const faqItems = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days within the US. International shipping varies by location and typically takes 10-14 business days."
  },
  {
    question: "Can I request custom pieces?",
    answer: "Yes! We love creating custom pieces. Please reach out via email with your ideas and we will discuss possibilities, timeline, and pricing."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn items in original condition. Custom orders are final sale. Please see our full policy for details."
  },
  {
    question: "How do I care for my crochet pieces?",
    answer: "Hand wash in cold water with mild detergent, lay flat to dry. Avoid wringing or hanging wet items. Store folded in a cool, dry place."
  }
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", subject: "", message: "" })
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

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
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              We&apos;d Love to
              <br />
              <span className="italic">Hear from You</span>
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Have a question about our products, need help with an order, or just want to say hello? 
              We&apos;re here to help and always happy to connect.
            </p>
          </motion.div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl font-light mb-8">Send a Message</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-accent/50 rounded-3xl p-8 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                    <p className="text-foreground/70">
                      Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-foreground/70 mb-2 block">
                          Your Name
                        </label>
                        <Input
                          type="text"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Jane Doe"
                          required
                          className="h-12 rounded-xl bg-card border-border/50 focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground/70 mb-2 block">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="jane@example.com"
                          required
                          className="h-12 rounded-xl bg-card border-border/50 focus:border-foreground transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground/70 mb-2 block">
                        Subject
                      </label>
                      <Input
                        type="text"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="How can we help?"
                        required
                        className="h-12 rounded-xl bg-card border-border/50 focus:border-foreground transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground/70 mb-2 block">
                        Message
                      </label>
                      <textarea
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell us more..."
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-border/50 focus:border-foreground focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-light mb-8">Contact Information</h2>
                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                          <item.icon className="w-5 h-5 text-foreground/70" />
                        </div>
                        <div>
                          <span className="text-sm text-foreground/60 block">{item.label}</span>
                          <span className="text-foreground font-medium">{item.value}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t border-border/50">
                  <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-accent/30">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-foreground/70">
                Quick answers to common questions
              </p>
            </motion.div>
            
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-soft"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between"
                  >
                    <span className="font-medium">{item.question}</span>
                    <motion.span
                      animate={{ rotate: openFaq === index ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl text-foreground/60"
                    >
                      +
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-foreground/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
