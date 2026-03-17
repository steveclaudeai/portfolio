'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import MagneticButton from './MagneticButton'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl bg-bg/70 animate-slide-down ${scrolled ? 'border-b border-slate-border' : 'border-b border-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-black tracking-tighter text-slate-text">
          SR<span className="text-emerald">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-muted text-sm hover:text-emerald transition-colors duration-200">
              {link.label}
            </a>
          ))}
          <MagneticButton>
            <a href="#contact" className="border border-emerald text-emerald text-sm px-4 py-2 rounded-md hover:bg-emerald hover:text-bg transition-all duration-200 inline-block">
              Hire Me
            </a>
          </MagneticButton>
        </div>

        <button className="md:hidden text-slate-muted hover:text-emerald transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-bg/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-slate-text text-2xl font-semibold hover:text-emerald transition-colors">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="border border-emerald text-emerald text-lg px-8 py-3 rounded-md hover:bg-emerald hover:text-bg transition-all duration-200 mt-4">
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}
