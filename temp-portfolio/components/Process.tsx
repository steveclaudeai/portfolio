'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

const steps = [
  { num: '1', title: 'Discover', desc: 'We talk about your goals, timeline, and budget. I listen more than I speak.' },
  { num: '2', title: 'Build', desc: 'I execute fast and keep you updated. No surprises, no excuses.' },
  { num: '3', title: 'Deliver', desc: 'You get results on time. I stay available for questions and support.' },
]

export default function Process() {
  return (
    <section id="process" className="relative z-10 py-28 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <TextReveal>
            <p className="text-slate-dimmer text-xs tracking-[4px] uppercase mb-3">How I Work</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-text">My Process</h2>
          </TextReveal>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-emerald via-emerald-dark to-[#047857] opacity-30" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative text-center md:text-left"
            >
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald flex items-center justify-center text-bg text-2xl font-black relative z-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-slate-text font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-slate-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
