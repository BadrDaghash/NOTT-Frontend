'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function IntroLoader() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('nott_visited')
    
    if (!hasVisited) {
      setIsVisible(true)
      sessionStorage.setItem('nott_visited', 'true')
      
      // Hide loader after animation completes
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(() => setIsVisible(false), 600)
      }, 2800)
      
      return () => clearTimeout(timer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#212121]"
        >
          <div className="relative flex flex-col items-center">
            {/* Crochet-inspired decorative elements */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute -top-20 -left-20 w-40 h-40 opacity-20"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f9e7cf"
                  strokeWidth="1"
                  strokeDasharray="8 4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#f9e7cf"
                  strokeWidth="1"
                  strokeDasharray="6 3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="#f9e7cf"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              className="absolute -bottom-16 -right-16 w-32 h-32 opacity-20"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f9e7cf"
                  strokeWidth="1"
                  strokeDasharray="8 4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="#f9e7cf"
                  strokeWidth="1"
                  strokeDasharray="5 3"
                />
              </svg>
            </motion.div>

            {/* Thread animation */}
            <motion.svg
              width="120"
              height="60"
              viewBox="0 0 120 60"
              className="absolute -top-8 opacity-40"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <motion.path
                d="M0 30 Q30 0 60 30 T120 30"
                fill="none"
                stroke="#f9e7cf"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.svg>

            {/* Logo reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative z-10"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-serif tracking-[0.3em] text-[#f9e7cf]"
                initial={{ letterSpacing: '0.5em', opacity: 0 }}
                animate={{ letterSpacing: '0.3em', opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                NOTT
              </motion.h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-4 text-sm tracking-[0.4em] text-[#f9e7cf]/60 uppercase"
            >
              Handcrafted Luxury
            </motion.p>

            {/* Loading indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              className="mt-8 h-[1px] w-24 bg-[#f9e7cf]/30 overflow-hidden"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: 1, ease: 'easeInOut' }}
                className="h-full w-full bg-[#f9e7cf]"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
