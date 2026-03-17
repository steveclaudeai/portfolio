'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import IntroScreen from './IntroScreen'
import NoiseOverlay from './NoiseOverlay'
import ScrollProgress from './ScrollProgress'
import CustomCursor from './CustomCursor'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [introDone, setIntroDone] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!lenisRef.current) return
    if (introDone) {
      lenisRef.current.start()
    } else {
      lenisRef.current.stop()
    }
  }, [introDone])

  return (
    <>
      <IntroScreen onComplete={handleIntroComplete} />
      <ScrollProgress />
      <NoiseOverlay />
      <CustomCursor />
      {children}
    </>
  )
}
