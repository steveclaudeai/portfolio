'use client'

import TextReveal from './TextReveal'

const testimonials = [
  {
    stars: 5,
    quote: 'Steve delivered beyond expectations. Professional, fast, and seriously skilled.',
    name: 'Client Name',
    country: '🇺🇸 USA',
  },
  {
    stars: 5,
    quote: "Outstanding work on our security audit. Found vulnerabilities we didn't even know existed.",
    name: 'Client Name',
    country: '🇨🇦 Canada',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 py-28 bg-bg2">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <TextReveal>
            <p className="text-slate-dimmer text-xs tracking-[4px] uppercase mb-3">What Clients Say</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-text">Testimonials</h2>
          </TextReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-bg border border-slate-border rounded-2xl p-8 hover:border-emerald/30 transition-colors duration-300">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="text-emerald">★</span>
                ))}
              </div>
              <p className="text-slate-muted leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-border" />
                <div>
                  <div className="text-slate-text font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-dimmer text-xs">{t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
