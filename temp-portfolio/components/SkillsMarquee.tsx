'use client'

const skills = [
  'Next.js',
  'React',
  'TypeScript',
  'Python',
  'Kali Linux',
  'ChatGPT',
  'Tailwind CSS',
  'Node.js',
  'Framer Motion',
  'Git',
  'Cybersecurity',
  'AI Automation',
]

export default function SkillsMarquee() {
  const row = skills.map((skill, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span className="text-slate-text text-xl md:text-2xl font-bold whitespace-nowrap tracking-tight">
        {skill}
      </span>
      <span className="w-2 h-2 rounded-full bg-emerald shrink-0" />
    </span>
  ))

  return (
    <section className="relative z-10 py-12 bg-bg2 overflow-hidden" aria-label="Skills">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg2 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg2 to-transparent z-10 pointer-events-none" />

      <div className="flex gap-8 animate-marquee hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </section>
  )
}
