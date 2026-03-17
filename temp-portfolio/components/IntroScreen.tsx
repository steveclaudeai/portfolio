'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem('intro-seen')) {
      setShow(false)
      onComplete()
      return
    }

    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('intro-seen', '1')
      document.body.style.overflow = ''
      onComplete()
    }, 1500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 200 80"
            className="w-[280px] md:w-[400px]"
            aria-label="SR."
          >
            {/* S */}
            <path
              d="M20 60 C20 60 15 55 15 48 C15 38 35 38 35 30 C35 22 15 22 15 28"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              className="intro-stroke"
              style={{ animationDelay: '0s' }}
            />
            {/* R */}
            <path
              d="M55 60 L55 20 L72 20 C82 20 82 38 72 38 L55 38 L80 60"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="intro-stroke"
              style={{ animationDelay: '0.15s' }}
            />
            {/* dot */}
            <circle
              cx="100"
              cy="58"
              r="4"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              className="intro-stroke"
              style={{ animationDelay: '0.4s' }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
