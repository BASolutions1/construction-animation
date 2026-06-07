// Site-wide parallax engine
// Elements with [data-px] get a translateY proportional to their distance
// from the viewport centre. Elements with [data-px-inner] are used for
// inner-image parallax inside overflow:hidden containers.
// Both respect the sr reveal system — parallax only starts after .in is added.

type ParallaxEl = { el: HTMLElement; speed: number; revealed: boolean }
type InnerEl    = { el: HTMLElement; speed: number }

export function initParallax(): void {
  const outerEls: ParallaxEl[] = Array.from(
    document.querySelectorAll<HTMLElement>('[data-px]')
  ).map(el => ({
    el,
    speed:    parseFloat(el.dataset.px ?? '0'),
    revealed: !el.classList.contains('sr'),
  }))

  const innerEls: InnerEl[] = Array.from(
    document.querySelectorAll<HTMLElement>('[data-px-inner]')
  ).map(el => ({
    el,
    speed: parseFloat(el.dataset.pxInner ?? '0'),
  }))

  // Apply any existing --delay CSS vars as transitionDelay
  outerEls.forEach(({ el }) => {
    const d = el.style.getPropertyValue('--delay')
    if (d) el.style.transitionDelay = d
  })

  // Watch for sr elements gaining .in so we can start parallaxing them
  const mo = new MutationObserver(mutations => {
    mutations.forEach(m => {
      if (m.type !== 'attributes' || m.attributeName !== 'class') return
      const target = m.target as HTMLElement
      const entry  = outerEls.find(p => p.el === target)
      if (entry && target.classList.contains('in')) {
        entry.revealed = true
        // After reveal transition completes, strip transform transition
        setTimeout(() => {
          entry.el.style.transition = entry.el.style.transition
            .replace(/,?\s*transform[^,]*/g, '').trim().replace(/^,/, '').trim()
        }, 680)
      }
    })
  })

  outerEls.forEach(({ el }) => {
    if (el.classList.contains('sr')) mo.observe(el, { attributes: true })
  })

  let rafId: number | null = null

  function update(): void {
    rafId = null
    const half = window.innerHeight / 2

    outerEls.forEach(({ el, speed, revealed }) => {
      if (!revealed) return
      const rect = el.getBoundingClientRect()
      const dist = (rect.top + rect.height * 0.5) - half
      el.style.transform = `translateY(${dist * speed}px)`
    })

    innerEls.forEach(({ el, speed }) => {
      const rect = el.getBoundingClientRect()
      const dist = (rect.top + rect.height * 0.5) - half
      el.style.transform = `translateY(${dist * speed}px)`
    })
  }

  const onScroll = (): void => {
    if (!rafId) rafId = requestAnimationFrame(update)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  update()
}
