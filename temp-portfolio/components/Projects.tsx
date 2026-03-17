'use client'

import TiltCard from './TiltCard'
import TextReveal from './TextReveal'

const projects = [
  {
    title: 'Project One',
    category: 'Web Development',
    year: '2024',
    gradient: 'from-emerald to-emerald-dark',
    href: '#',
  },
  {
    title: 'Project Two',
    category: 'AI Automation',
    year: '2024',
    gradient: 'from-[#0d9488] to-[#0a6a60]',
    href: '#',
  },
  {
    title: 'Project Three',
    category: 'Security Audit',
    year: '2024',
    gradient: 'from-[#065f46] to-[#047857]',
    href: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-28 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <TextReveal>
            <p className="text-slate-dimmer text-xs tracking-[4px] uppercase mb-3">My Work</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-text">Featured Projects</h2>
          </TextReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <TiltCard key={project.title} className="group block bg-bg2 border border-slate-border rounded-2xl overflow-hidden hover:border-emerald/40 hover:-translate-y-1 transition-all duration-300">
              <a href={project.href} className="block">
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 right-4 text-white/20 text-5xl font-black tracking-tight">
                    {project.title.split(' ')[1]}
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-text font-semibold mb-1">{project.title}</h3>
                    <p className="text-slate-muted text-sm">{project.category} · {project.year}</p>
                  </div>
                  <span className="text-emerald text-sm group-hover:translate-x-1 transition-transform">View →</span>
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
