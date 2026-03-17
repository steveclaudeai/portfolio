'use client'

import MagneticButton from './MagneticButton'
import TextReveal from './TextReveal'

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 py-32 bg-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <TextReveal>
          <p className="text-slate-dimmer text-xs tracking-[4px] uppercase mb-6">Ready?</p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            <span className="text-slate-text">Let&apos;s build something</span>
            <br />
            <span className="text-emerald">great together.</span>
          </h2>
        </TextReveal>
        <TextReveal delay={0.2}>
          <p className="text-slate-muted text-lg leading-relaxed mb-12 max-w-md mx-auto">
            Available for freelance projects, consulting, and long-term partnerships.
            Let&apos;s talk about what you need.
          </p>
        </TextReveal>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton>
            <a
              href="#"
              className="group relative bg-emerald text-bg font-bold px-8 py-4 rounded-lg overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(16,185,129,0.35)] transition-all duration-200 inline-block"
            >
              <span className="relative z-10">View on Upwork →</span>
              <span className="absolute inset-0 bg-white/15 -translate-x-full skew-x-[-15deg] group-hover:translate-x-[150%] transition-transform duration-500" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="mailto:steve@placeholder.com"
              className="border border-slate-border text-slate-muted px-8 py-4 rounded-lg hover:border-emerald hover:text-emerald hover:-translate-y-0.5 transition-all duration-200 inline-block"
            >
              Send Email
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
