'use client'

import { motion } from 'framer-motion'

export default function TextReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'h2' | 'p' | 'span'
}) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)', y: 20, opacity: 0 }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {Tag === 'div' ? children : <Tag>{children}</Tag>}
    </motion.div>
  )
}
