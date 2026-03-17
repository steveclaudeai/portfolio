'use client'

import { useEffect, useRef } from 'react'

interface HalftonePhotoProps {
  src: string
  alt: string
  className?: string
  dotGap?: number
  maxDotSize?: number
  pulseInterval?: number
  anchorY?: number
}

export default function HalftonePhoto({
  src,
  alt,
  className = '',
  dotGap = 4,
  maxDotSize = 1.8,
  pulseInterval = 4500,
  anchorY = 0.5,
}: HalftonePhotoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    let animId: number

    img.onload = () => {
      const rect = container.getBoundingClientRect()
      const scale = Math.max(rect.width / img.width, rect.height / img.height)

      canvas.width = rect.width
      canvas.height = rect.height

      // Sample image
      const offscreen = document.createElement('canvas')
      offscreen.width = img.width
      offscreen.height = img.height
      const offCtx = offscreen.getContext('2d')!
      offCtx.drawImage(img, 0, 0)
      const imageData = offCtx.getImageData(0, 0, img.width, img.height)

      const offsetX = (rect.width - img.width * scale) / 2
      const offsetY = (rect.height - img.height * scale) * anchorY

      // Pre-compute ALL dot data
      const step = Math.max(1, Math.round(dotGap / scale))
      const dotX: number[] = []
      const dotY: number[] = []
      const dotBrightness: number[] = []
      const dotVignette: number[] = []

      for (let sy = 0; sy < img.height; sy += step) {
        for (let sx = 0; sx < img.width; sx += step) {
          const i = (sy * img.width + sx) * 4
          const brightness = (
            imageData.data[i] * 0.299 +
            imageData.data[i + 1] * 0.587 +
            imageData.data[i + 2] * 0.114
          ) / 255

          if (brightness < 0.04) continue

          const cx = offsetX + sx * scale
          const cy = offsetY + sy * scale
          const nx = cx / rect.width
          const ny = cy / rect.height

          // Vignette: soft edge fade
          const fadeL = Math.min(1, nx / 0.1)
          const fadeR = Math.min(1, (1 - nx) / 0.18)
          const fadeT = Math.min(1, ny / 0.08)
          const fadeB = Math.min(1, (1 - ny) / 0.12)
          const corner = Math.min(1, Math.max(0,
            (1.35 - Math.sqrt(((nx - 0.5) * 2) ** 2 + ((ny - 0.5) * 2) ** 2)) / 0.55
          ))
          const vig = fadeL * fadeR * fadeT * fadeB * corner

          if (vig < 0.01) continue

          dotX.push(cx)
          dotY.push(cy)
          dotBrightness.push(brightness)
          dotVignette.push(vig)
        }
      }

      const numDots = dotX.length

      // Pre-render static frame to offscreen canvas (no pulse)
      const staticCanvas = document.createElement('canvas')
      staticCanvas.width = rect.width
      staticCanvas.height = rect.height
      const sCtx = staticCanvas.getContext('2d')!
      sCtx.fillStyle = '#0a0f0d'
      sCtx.fillRect(0, 0, rect.width, rect.height)

      for (let i = 0; i < numDots; i++) {
        const r = dotBrightness[i] * maxDotSize
        if (r < 0.2) continue
        const a = (0.35 + dotBrightness[i] * 0.65) * dotVignette[i]
        if (a < 0.02) continue
        sCtx.fillStyle = `rgba(16, 185, 129, ${a})`
        sCtx.beginPath()
        sCtx.arc(dotX[i], dotY[i], r, 0, Math.PI * 2)
        sCtx.fill()
      }

      // Pulse state: origin on a random edge, wave goes INWARD
      let pulseOriginX = 0
      let pulseOriginY = 0
      let lastPulseStart = performance.now()
      const maxDist = Math.sqrt(rect.width ** 2 + rect.height ** 2)

      function pickEdgeOrigin() {
        // Pick a random point on one of the 4 edges
        const edge = Math.floor(Math.random() * 4)
        switch (edge) {
          case 0: pulseOriginX = Math.random() * rect.width; pulseOriginY = 0; break
          case 1: pulseOriginX = rect.width; pulseOriginY = Math.random() * rect.height; break
          case 2: pulseOriginX = Math.random() * rect.width; pulseOriginY = rect.height; break
          case 3: pulseOriginX = 0; pulseOriginY = Math.random() * rect.height; break
        }
      }
      pickEdgeOrigin()

      // Pause animation when not visible
      let visible = true
      const observer = new IntersectionObserver(
        ([entry]) => { visible = entry.isIntersecting },
        { threshold: 0.1 }
      )
      observer.observe(canvas)

      const draw = (time: number) => {
        if (!visible) {
          animId = requestAnimationFrame(draw)
          return
        }

        // Blit static frame as base
        ctx.drawImage(staticCanvas, 0, 0)

        const elapsed = time - lastPulseStart
        const progress = elapsed / pulseInterval

        if (progress >= 1) {
          lastPulseStart = time
          pickEdgeOrigin()
          animId = requestAnimationFrame(draw)
          return
        }

        // Wave expands from the edge origin inward
        const pulseRadius = progress * maxDist
        const pw = 65

        for (let i = 0; i < numDots; i++) {
          const dx = dotX[i] - pulseOriginX
          const dy = dotY[i] - pulseOriginY
          const rawDist = Math.sqrt(dx * dx + dy * dy)

          if (Math.abs(rawDist - pulseRadius) > pw * 1.3) continue

          const dtp = Math.abs(rawDist - pulseRadius)
          if (dtp >= pw) continue

          const prox = 1 - dtp / pw
          const smooth = prox * prox * (3 - 2 * prox)
          const pScale = 1 + smooth * 0.5
          const pGlow = smooth * 0.3

          const r = dotBrightness[i] * maxDotSize * pScale
          if (r < 0.2) continue
          const a = (0.35 + dotBrightness[i] * 0.65) * dotVignette[i]
          if (a < 0.02) continue

          const cr = Math.round(16 + pGlow * 60)
          const cg = Math.round(185 + pGlow * 70)
          const cb = Math.round(129 + pGlow * 60)

          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${Math.min(1, a + pGlow)})`
          ctx.beginPath()
          ctx.arc(dotX[i], dotY[i], r, 0, Math.PI * 2)
          ctx.fill()
        }

        animId = requestAnimationFrame(draw)
      }

      animId = requestAnimationFrame(draw)

      return () => {
        observer.disconnect()
      }
    }

    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [src, dotGap, maxDotSize, pulseInterval, anchorY])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        role="img"
        aria-label={alt}
      />
    </div>
  )
}
