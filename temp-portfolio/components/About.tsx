'use client'

import TiltCard from './TiltCard'
import TextReveal from './TextReveal'
import HalftonePhoto from './HalftonePhoto'
import { MapPin } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useInView, animate } from 'framer-motion'

const techStack = ['Next.js', 'React', 'TypeScript', 'Python', 'Node.js', 'Tailwind']
const skillBadges = ['Web Dev', 'Security', 'AI/Automation', 'Pentesting', 'API Design', 'Cloud']

function ExperienceCounter() {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, 5, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView])

  return <span ref={ref}>{count}+</span>
}

export default function About() {
  return (
    <section id="about" className="relative z-10 py-28 bg-bg2">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <TextReveal>
            <p className="text-slate-dimmer text-xs tracking-[4px] uppercase mb-3">About Me</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-text">Steve Rios</h2>
          </TextReveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">

          {/* Photo - 2 cols, 2 rows */}
          <TextReveal delay={0.1} className="md:col-span-2 md:row-span-2">
            <TiltCard className="w-full h-full bg-bg border border-slate-border rounded-2xl overflow-hidden">
              <HalftonePhoto
                src="/images/steve.jpg"
                alt="Steve Rios"
                className="w-full h-full"
                dotGap={4}
                maxDotSize={1.6}
                pulseInterval={5000}
              />
            </TiltCard>
          </TextReveal>

          {/* Location */}
          <TextReveal delay={0.2}>
            <TiltCard className="w-full h-full bg-bg border border-slate-border rounded-2xl p-6 flex flex-col justify-between">
              <MapPin className="text-emerald" size={24} strokeWidth={1.5} />
              <div>
                <p className="text-slate-dimmer text-xs uppercase tracking-wider mb-1">Location</p>
                <p className="text-slate-text text-2xl font-bold">Mexico</p>
              </div>
            </TiltCard>
          </TextReveal>

          {/* Experience */}
          <TextReveal delay={0.3}>
            <TiltCard className="w-full h-full bg-bg border border-slate-border rounded-2xl p-6 flex flex-col justify-between">
              <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center">
                <span className="text-emerald text-sm font-bold">XP</span>
              </div>
              <div>
                <p className="text-slate-dimmer text-xs uppercase tracking-wider mb-1">Experience</p>
                <p className="text-slate-text text-2xl font-bold"><ExperienceCounter /> Years</p>
              </div>
            </TiltCard>
          </TextReveal>

          {/* About Text - 2 cols */}
          <TextReveal delay={0.3} className="md:col-span-2">
            <TiltCard className="w-full h-full bg-bg border border-slate-border rounded-2xl p-6 flex items-center">
              <p className="text-slate-muted leading-relaxed text-sm">
                I&apos;m a tech professional with a passion for building things that matter.
                I combine web development, cybersecurity expertise, and cutting-edge AI tools to deliver
                solutions that are not just functional — but exceptional. Agency-level approach with personal attention to every project.
              </p>
            </TiltCard>
          </TextReveal>

          {/* Skills Cloud */}
          <TextReveal delay={0.4}>
            <TiltCard className="w-full h-full bg-bg border border-slate-border rounded-2xl p-6 flex flex-col justify-between">
              <p className="text-slate-dimmer text-xs uppercase tracking-wider mb-3">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {skillBadges.map((skill) => (
                  <span key={skill} className="bg-emerald/10 border border-emerald/20 text-emerald text-[10px] px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          </TextReveal>

          {/* Tech Stack */}
          <TextReveal delay={0.5}>
            <TiltCard className="w-full h-full bg-bg border border-slate-border rounded-2xl p-6 flex flex-col justify-between">
              <p className="text-slate-dimmer text-xs uppercase tracking-wider mb-3">Tech Stack</p>
              <div className="space-y-1">
                {techStack.map((tech) => (
                  <div key={tech} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-emerald" />
                    <span className="text-slate-text text-xs font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </TextReveal>

        </div>
      </div>
    </section>
  )
}
