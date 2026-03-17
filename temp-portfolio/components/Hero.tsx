'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
import MagneticButton from './MagneticButton'
import HalftonePhoto from './HalftonePhoto'

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplayed(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, target])

  return (
    <span ref={ref}>
      {displayed}<span className="text-emerald">{suffix}</span>
    </span>
  )
}

const TYPEWRITER_WORDS = ['Rios.', ' · Dev.', ' · Security.', ' · AI.']

function useTypewriter(words: string[]) {
  const [display, setDisplay] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    const speed = deleting ? 60 : 100
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, charIndex + 1))
        if (charIndex + 1 === word.length) {
          setTimeout(() => setDeleting(true), 2000)
        } else {
          setCharIndex(c => c + 1)
        }
      } else {
        setDisplay(word.slice(0, charIndex - 1))
        if (charIndex - 1 === 0) {
          setDeleting(false)
          setWordIndex(i => (i + 1) % words.length)
          setCharIndex(0)
        } else {
          setCharIndex(c => c - 1)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [charIndex, deleting, wordIndex, words])

  return display
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_WORDS)

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleCanvas />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute right-[5%] top-[20%] w-[400px] h-[400px] pointer-events-none z-0 animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="absolute right-[12%] top-1/2 -translate-y-[55%] w-[380px] h-[480px] hidden md:block">
        <HalftonePhoto
          src="/images/steve.jpg"
          alt="Steve Rios"
          className="w-full h-full"
          dotGap={4}
          maxDotSize={1.8}
          pulseInterval={4500}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-full md:max-w-[50%]">
          <motion.div {...fadeUp(0.3)} className="inline-flex items-center gap-2 bg-emerald/10 border border-emerald/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-blink" />
            <span className="text-emerald text-xs tracking-[3px] uppercase">Available for hire</span>
          </motion.div>

          <motion.h1 {...fadeUp(0.5)} className="text-6xl md:text-8xl font-black leading-none tracking-[-3px] text-slate-text mb-6">
            Hi, I&apos;m<br />
            <span className="text-emerald">
              Steve<span className="border-r-[3px] border-emerald animate-blink ml-0.5">{typed}</span>
            </span>
          </motion.h1>

          <motion.div {...fadeUp(0.7)} className="w-10 h-0.5 bg-emerald rounded-full mb-6" />

          <motion.p {...fadeUp(0.9)} className="text-slate-muted text-lg leading-relaxed max-w-md">
            I build <span className="text-emerald font-semibold">websites</span>, secure systems,
            and automate businesses with <span className="text-emerald font-semibold">AI</span>.
          </motion.p>

          <div className="block md:hidden mt-6 flex justify-center">
            <div className="w-44 h-44 rounded-2xl overflow-hidden border border-slate-border mx-auto">
              <img src="/images/steve.jpg" alt="Steve Rios" className="w-full h-full object-cover object-top" />
            </div>
          </div>

          <motion.div {...fadeUp(1.1)} className="flex gap-4 mt-10">
            <MagneticButton>
              <a href="#contact" className="group relative bg-emerald text-bg font-bold px-7 py-3.5 rounded-lg overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(16,185,129,0.3)] transition-all duration-200 inline-block">
                <span className="relative z-10">Let&apos;s Work Together →</span>
                <span className="absolute inset-0 bg-white/15 -translate-x-full skew-x-[-15deg] group-hover:translate-x-[150%] transition-transform duration-500" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#projects" className="border border-slate-border text-slate-muted px-7 py-3.5 rounded-lg hover:border-emerald hover:text-emerald hover:-translate-y-0.5 transition-all duration-200 inline-block">
                View Projects
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div {...fadeUp(1.3)} className="flex flex-wrap gap-6 sm:gap-10 mt-12 pt-8 border-t border-slate-border">
            {[
              { target: 50, suffix: '+', label: 'Projects done' },
              { target: 3, suffix: 'x', label: 'Services offered' },
              { target: 100, suffix: '%', label: 'Client satisfaction' },
            ].map(({ target, suffix, label }) => (
              <div key={label}>
                <div className="text-3xl font-black tracking-tight text-slate-text">
                  <AnimatedCounter target={target} suffix={suffix} />
                </div>
                <div className="text-xs text-slate-dimmer mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-px h-10 bg-gradient-to-b from-emerald to-transparent animate-scroll-line" />
        <span className="text-slate-dimmer text-[10px] tracking-[3px] uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
