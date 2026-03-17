import AppShell from '@/components/AppShell'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import About from '@/components/About'
import SkillsMarquee from '@/components/SkillsMarquee'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <AppShell>
      <main className="bg-bg">
        <Nav />
        <Hero />
        <Services />
        <Projects />
        <About />
        <SkillsMarquee />
        <Process />
        <Testimonials />
        <Contact />
        <footer className="border-t border-slate-border py-6 text-center text-slate-dimmer text-sm relative z-10">
          © {new Date().getFullYear()} Steve Rios · Built with Next.js
        </footer>
      </main>
    </AppShell>
  )
}
