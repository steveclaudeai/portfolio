'use client'

import { useEffect, useRef } from 'react'

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 128
    canvas.height = 128
    const imageData = ctx.createImageData(128, 128)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255
      data[i] = v
      data[i + 1] = v
      data[i + 2] = v
      data[i + 3] = 15
    }

    ctx.putImageData(imageData, 0, 0)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[60] pointer-events-none mix-blend-overlay"
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}
