import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const categories = [
  { href: '/shop?category=duffle-bag', label: 'Duffle Bags' },
  { href: '/shop?category=bottle-holder', label: 'Bottle Holders' },
  { href: '/shop?category=mat-holder', label: 'Mat Holders' },
  { href: '/shop?category=sets', label: 'Sets' },
]

const socialLinks = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
]

export function Footer() {
  return (
    <footer className="bg-[#212121] text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-3xl font-serif tracking-[0.2em] text-[#f9e7cf]"
            >
              NOTT
            </Link>
            <p className="mt-6 text-sm text-white/60 leading-relaxed">
              Crafting timeless pieces with love and dedication. Each NOTT creation 
              is a unique work of art, blending traditional crochet craftsmanship 
              with modern elegance.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:bg-[#f9e7cf] hover:text-[#212121] hover:border-[#f9e7cf] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#f9e7cf] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-6">
              Categories
            </h4>
            <ul className="space-y-4">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#f9e7cf] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">
                  Email
                </span>
                <a
                  href="mailto:hello@nott.com"
                  className="hover:text-[#f9e7cf] transition-colors"
                >
                  hello@nott.com
                </a>
              </li>
              <li>
                <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">
                  Phone
                </span>
                <a
                  href="tel:+201092267497"
                  className="hover:text-[#f9e7cf] transition-colors"
                >
                  +20 109 226 7497
                </a>
              </li>
              <li>
                <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">
                  Location
                </span>
                Cairo, Egypt
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} NOTT. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/40">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
