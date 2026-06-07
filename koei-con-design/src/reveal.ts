// Scroll reveal + animated stat bars

export function initReveal(): void {
  // ── Scroll reveal ──────────────────────────────────────────
  const srEls = Array.from(document.querySelectorAll<HTMLElement>('.sr'))

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        ;(e.target as HTMLElement).classList.add('in')
        io.unobserve(e.target)
      })
    },
    { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
  )
  srEls.forEach(el => io.observe(el))

  // ── Divider lines ──────────────────────────────────────────
  const divIo = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        ;(e.target as HTMLElement).classList.add('in')
        divIo.unobserve(e.target)
      })
    },
    { threshold: 0.5 }
  )
  document.querySelectorAll<HTMLElement>('.divider').forEach(el => divIo.observe(el))

  // ── Stat bar fill animations ───────────────────────────────
  const statTargets = [0.82, 0.65, 0.98, 1.0]

  document.querySelectorAll<HTMLElement>('.stat-card').forEach((card, i) => {
    const sIo = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const fill = (e.target as HTMLElement).querySelector<HTMLElement>('.stat-bar-fill')
          if (fill) {
            const scale = statTargets[i] ?? 0.7
            fill.style.transition    = `transform 0.8s ${i * 0.08}s cubic-bezier(.22,1,.36,1)`
            fill.style.transformOrigin = 'left'
            fill.style.transform     = `scaleX(${scale})`
          }
          sIo.unobserve(e.target)
        })
      },
      { threshold: 0.3 }
    )
    sIo.observe(card)
  })

  // ── Stagger grid children ──────────────────────────────────
  const grids = '.services-grid, .projects-grid, .testimonials-grid, .stats-grid'
  document.querySelectorAll<HTMLElement>(grids).forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      const el = child as HTMLElement
      if (!el.style.transitionDelay) {
        el.style.transitionDelay = `${i * 0.07}s`
      }
    })
  })
}
