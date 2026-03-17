'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
}: {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(true)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsDesktop(false)
      return
    }

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    rotateX.set(-percentY * maxTilt)
    rotateY.set(percentX * maxTilt)
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  if (!isDesktop) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: 800,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(16,185,129,0.08) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  )
}
