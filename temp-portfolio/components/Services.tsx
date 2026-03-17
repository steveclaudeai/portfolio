'use client'

import { Globe, ShieldCheck, Bot } from 'lucide-react'
import TiltCard from './TiltCard'
import TextReveal from './TextReveal'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Fast, modern websites and web apps built with the latest tech. From landing pages to full-stack platforms.',
    price: 'From $500',
    popular: false,
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    description: 'Security audits, penetration testing, and vulnerability assessments to protect your business.',
    price: 'From $800',
    popular: true,
  },
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Custom AI agents and automated workflows that save your team hours every single week.',
    price: 'From $600',
    popular: false,
  },
]

export default function Services() {
  return (
    <section id="services" className="relative z-10 py-28 bg-bg2">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <TextReveal>
            <p className="text-slate-dimmer text-xs tracking-[4px] uppercase mb-3">What I Do</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-text">Services</h2>
          </TextReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <TiltCard key={svc.title} className={`relative group bg-bg border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${svc.popular ? 'border-emerald hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'border-slate-border hover:border-emerald/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]'}`}>
                {svc.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald text-bg text-xs font-bold px-3 py-0.5 rounded-full">Popular</span>
                )}
                <Icon className="text-emerald mb-5" size={28} strokeWidth={1.5} />
                <h3 className="text-slate-text font-bold text-xl mb-3">{svc.title}</h3>
                <p className="text-slate-muted text-sm leading-relaxed mb-6">{svc.description}</p>
                <div className="text-emerald font-semibold text-sm">{svc.price}</div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
