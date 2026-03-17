'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouse = useRef({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    document.documentElement.classList.add('cursor-hidden')
    setVisible(true)

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        setHovering(true)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        setHovering(false)
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    let animId: number
    const animate = () => {
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${mouse.current.x - 12}px, ${mouse.current.y - 12}px)`
      }

      trailRefs.current.forEach((trail, i) => {
        if (trail) {
          const delay = (i + 1) * 0.08
          trail.style.transition = `transform ${0.15 + delay}s ease-out, opacity ${0.15 + delay}s ease-out`
          trail.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`
        }
      })

      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.documentElement.classList.remove('cursor-hidden')
      cancelAnimationFrame(animId)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Trail circles */}
      {[0.2, 0.15, 0.1].map((opacity, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[70]"
          style={{
            backgroundColor: `rgba(16, 185, 129, ${opacity})`,
            transform: 'translate(-100px, -100px)',
          }}
        />
      ))}

      {/* Outer halo */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[70] transition-[width,height,margin] duration-200"
        style={{
          border: '1.5px solid rgba(16, 185, 129, 0.6)',
          boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)',
          transform: 'translate(-100px, -100px)',
          width: hovering ? 40 : 24,
          height: hovering ? 40 : 24,
          marginLeft: hovering ? -8 : 0,
          marginTop: hovering ? -8 : 0,
          transition: 'width 0.2s, height 0.2s, margin 0.2s, transform 0.15s ease-out',
        }}
      />

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald pointer-events-none z-[70]"
        style={{
          transform: 'translate(-100px, -100px)',
          boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)',
        }}
      />
    </>
  )
}
