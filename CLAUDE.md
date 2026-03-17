# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos de desarrollo

El proyecto se encuentra en el subdirectorio `temp-portfolio/`:

```bash
cd temp-portfolio

npm run dev      # Servidor de desarrollo en http://localhost:3000
npm run build    # Compilacion de produccion
npm start        # Servidor de produccion (requiere build previo)
npm run lint     # Validacion con ESLint
```

## Arquitectura

Portfolio web de Steve Rios construido con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** y **Lenis** (smooth scroll).

### Flujo de renderizado

```
app/page.tsx  →  AppShell  →  secciones (Nav, Hero, Services, Projects, About, SkillsMarquee, Process, Testimonials, Contact)
```

- `app/layout.tsx`: HTML root, metadata SEO/OG, fuente Inter desde Google Fonts
- `app/page.tsx`: Composicion de todas las secciones
- `components/AppShell.tsx`: Client component que inicializa Lenis, maneja la IntroScreen, monta CustomCursor, NoiseOverlay y ScrollProgress

### Componentes especiales

| Componente | Proposito |
|---|---|
| `AppShell.tsx` | Wrapper global: Lenis, intro, overlays |
| `IntroScreen.tsx` | Splash screen de carga antes del contenido |
| `CustomCursor.tsx` | Cursor HTML5 personalizado (oculta el cursor nativo) |
| `ParticleCanvas.tsx` | Efecto de particulas en canvas |
| `HalftonePhoto.tsx` | Filtro halftone sobre la foto de Steve |
| `MagneticButton.tsx` | Botones que siguen el cursor magneticamente |
| `TiltCard.tsx` | Tarjetas con efecto 3D tilt |
| `TextReveal.tsx` | Animacion de aparicion de texto |

### Estilos y temas

- **Paleta**: fondo `#0a0f0d` (dark), acento `emerald` (#10b981), textos en `slate`
- **Tailwind custom**: animaciones `fade-up`, `slide-down`, `blink`, `pulse-glow`, `marquee`, `scroll-line` definidas en `tailwind.config.ts`
- **Globals**: `app/globals.css` contiene variables CSS, custom scrollbar, seleccion emerald y keyframes del intro
- **Alias de importacion**: `@/` apunta a la raiz del proyecto (`temp-portfolio/`)

### Foto profesional

`public/images/steve.jpg` — usada en el componente `HalftonePhoto` de la seccion About.
