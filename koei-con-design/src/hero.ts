import * as THREE from 'three'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_3EjMedjA9T4i7rgdd5fK2z6G1er/hf_20260605_194441_edc6d425-f0c1-4212-915e-6c71acf66b90.mp4'
const DURATION  = 1.5  // seconds for full 0→1 traversal

// ── Adaptive quality ─────────────────────────────────────────
// Mobile & slow connections get fewer frames + smaller canvas
// to keep extraction fast and memory use low.
const isMobile = window.matchMedia('(max-width: 768px)').matches
const conn     = (navigator as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
const isSlow   = conn ? (conn.saveData === true || conn.effectiveType === '2g' || conn.effectiveType === '3g') : false

const NUM_FRAMES = isMobile || isSlow ? 60  : 120
const CANVAS_W   = isMobile || isSlow ? 640 : 1280
const CANVAS_H   = isMobile || isSlow ? 360 : 720

// ── DOM refs ─────────────────────────────────────────────────
const canvas      = document.getElementById('hero-canvas')        as HTMLCanvasElement
const driver      = document.getElementById('hero-scroll-driver') as HTMLElement
const progressBar = document.getElementById('video-progress')     as HTMLElement
const scrollHint  = document.getElementById('scroll-hint')        as HTMLElement
const heroContent = document.getElementById('hero-content')       as HTMLElement
const navEl       = document.getElementById('nav')                as HTMLElement
const loaderFill  = document.getElementById('fl-fill')            as HTMLElement | null

// ── Three.js ─────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))

const scene  = new THREE.Scene()
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

// Offscreen canvas — frames drawn here, Three.js CanvasTexture reads it
const offscreen = document.createElement('canvas')
offscreen.width  = CANVAS_W
offscreen.height = CANVAS_H
const offCtx    = offscreen.getContext('2d')!
const canvasTex = new THREE.CanvasTexture(offscreen)
canvasTex.minFilter = THREE.LinearFilter
canvasTex.magFilter = THREE.LinearFilter

const cropRepeat = new THREE.Vector2(1, 1)
const cropOffset = new THREE.Vector2(0, 0)

const vertShader = /* glsl */`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`
const fragShader = /* glsl */`
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform vec2 uRepeat;
  uniform vec2 uOffset;
  uniform float uReady;
  vec3 gradTop    = vec3(0.06, 0.08, 0.10);
  vec3 gradMid    = vec3(0.14, 0.10, 0.06);
  vec3 gradBottom = vec3(0.04, 0.04, 0.05);
  void main() {
    float t  = vUv.y;
    vec3  bg = mix(gradBottom, mix(gradMid, gradTop, smoothstep(0.3, 0.72, t)), t);
    if (uReady > 0.5) {
      vec2 uv    = vUv * uRepeat + uOffset;
      vec4 frame = texture2D(uTex, uv);
      bg = mix(bg, frame.rgb, 0.94);
    }
    gl_FragColor = vec4(bg, 1.0);
  }
`

const mat = new THREE.ShaderMaterial({
  vertexShader:   vertShader,
  fragmentShader: fragShader,
  uniforms: {
    uTex:    { value: canvasTex },
    uRepeat: { value: cropRepeat },
    uOffset: { value: cropOffset },
    uReady:  { value: 0.0 },
  },
  depthWrite: false,
})
scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat))

// ── Resize ───────────────────────────────────────────────────
function resize(): void {
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  renderer.setSize(w, h, false)
  const vidAspect    = CANVAS_W / CANVAS_H
  const screenAspect = w / h
  if (screenAspect > vidAspect) {
    cropRepeat.set(1, vidAspect / screenAspect)
    cropOffset.set(0, (1 - cropRepeat.y) / 2)
  } else {
    cropRepeat.set(screenAspect / vidAspect, 1)
    cropOffset.set((1 - cropRepeat.x) / 2, 0)
  }
}
window.addEventListener('resize', resize)
resize()

// ── Frame extraction ─────────────────────────────────────────
const frames: ImageBitmap[] = []
let ready = false

function seekTo(vid: HTMLVideoElement, time: number): Promise<void> {
  return new Promise<void>(resolve => {
    const handler = (): void => { vid.removeEventListener('seeked', handler); resolve() }
    vid.addEventListener('seeked', handler)
    vid.currentTime = time
  })
}

async function extractFrames(): Promise<void> {
  const vid       = document.createElement('video')
  vid.src         = VIDEO_URL
  vid.crossOrigin = 'anonymous'
  vid.muted       = true
  vid.playsInline = true
  vid.preload     = 'auto'

  await new Promise<void>(resolve => {
    vid.addEventListener('loadedmetadata', () => resolve(), { once: true })
    vid.load()
  })

  const dur = vid.duration
  for (let i = 0; i < NUM_FRAMES; i++) {
    await seekTo(vid, (i / (NUM_FRAMES - 1)) * dur)
    frames.push(await createImageBitmap(vid as unknown as ImageBitmapSource))
    if (loaderFill) loaderFill.style.width = `${((i + 1) / NUM_FRAMES) * 100}%`
  }

  offCtx.drawImage(frames[0], 0, 0, CANVAS_W, CANVAS_H)
  canvasTex.needsUpdate     = true
  mat.uniforms.uReady.value = 1.0
  ready                     = true

  const loader = document.getElementById('frame-loader')
  if (loader) {
    loader.classList.add('done')
    setTimeout(() => loader.remove(), 900)
  }
}

// ── Playback state ───────────────────────────────────────────
let progress  = 0
let isPlaying = false
let playDir   = 0
let playStart = 0
let playFrom  = 0
let lastIdx   = -1

function maxScroll(): number {
  return driver.offsetHeight - window.innerHeight
}
function inHeroZone(): boolean {
  return window.scrollY < maxScroll() + 4
}
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
function startPlay(dir: 1 | -1): void {
  if (isPlaying && playDir === dir) return
  playDir   = dir
  isPlaying = true
  playStart = 0
  playFrom  = progress
}

// Reduced parallax on mobile (less drift, no jank)
const PARALLAX_STRENGTH = isMobile ? 0.12 : 0.28

function updateHeroUI(p: number): void {
  const viewH     = window.innerHeight
  const parallaxY = p * viewH * PARALLAX_STRENGTH
  const fadeStart = 0.38
  const opacity   = p < fadeStart ? 1 : Math.max(0, 1 - (p - fadeStart) / 0.22)
  heroContent.style.transform = `translateY(-${parallaxY}px)`
  heroContent.style.opacity   = String(opacity)
  progressBar.style.width     = `${p * 100}%`
  scrollHint.classList.toggle('hidden', p > 0.02 || !inHeroZone())
  navEl.className = inHeroZone() ? 'transparent' : 'solid'
}

// ── Input: wheel (desktop) ───────────────────────────────────
document.addEventListener('wheel', (e: WheelEvent) => {
  if (!inHeroZone()) return
  const dir = e.deltaY > 0 ? 1 : -1
  if (dir === 1  && progress < 1) { e.preventDefault(); startPlay(1)  }
  if (dir === -1 && progress > 0) { e.preventDefault(); startPlay(-1) }
}, { passive: false })

// ── Input: touch (mobile) ────────────────────────────────────
let touchY0    = 0
let touchLocked = false   // prevents double-firing while playing

document.addEventListener('touchstart', (e: TouchEvent) => {
  touchY0    = e.touches[0].clientY
  touchLocked = false
}, { passive: true })

document.addEventListener('touchmove', (e: TouchEvent) => {
  if (!inHeroZone() || touchLocked) return
  const dy  = touchY0 - e.touches[0].clientY
  if (Math.abs(dy) < 12) return               // dead-zone — ignore tiny jitter
  const dir = dy > 0 ? 1 : -1
  if (dir === 1  && progress < 1) { e.preventDefault(); startPlay(1);  touchLocked = true }
  if (dir === -1 && progress > 0) { e.preventDefault(); startPlay(-1); touchLocked = true }
}, { passive: false })

document.addEventListener('touchend', () => { touchLocked = false }, { passive: true })

// ── Scroll (nav sync outside hero) ──────────────────────────
window.addEventListener('scroll', () => {
  if (!isPlaying) {
    navEl.className = inHeroZone() ? 'transparent' : 'solid'
    scrollHint.classList.toggle('hidden', window.scrollY > 10)
  }
}, { passive: true })

// ── Render loop ──────────────────────────────────────────────
function tick(now: DOMHighResTimeStamp): void {
  requestAnimationFrame(tick)

  if (ready && frames.length > 0) {
    if (isPlaying) {
      if (playStart === 0) playStart = now
      const elapsed = (now - playStart) / 1000
      const span    = Math.max(playDir === 1 ? (1 - playFrom) : playFrom, 0.001)
      const dur     = DURATION * span
      const t       = Math.min(elapsed / dur, 1)
      const e2      = easeInOut(t)

      progress = playDir === 1
        ? playFrom + span * e2
        : playFrom - span * e2
      progress = Math.max(0, Math.min(1, progress))

      window.scrollTo(0, progress * maxScroll())
      updateHeroUI(progress)

      if (t >= 1) {
        progress  = playDir === 1 ? 1 : 0
        isPlaying = false
        playStart = 0
        updateHeroUI(progress)
      }
    }

    const idx = Math.round(progress * (frames.length - 1))
    if (idx !== lastIdx) {
      lastIdx = idx
      offCtx.drawImage(frames[idx], 0, 0, CANVAS_W, CANVAS_H)
      canvasTex.needsUpdate = true
    }
  }

  renderer.render(scene, camera)
}

// ── Boot ─────────────────────────────────────────────────────
export function initHero(): void {
  extractFrames()
  requestAnimationFrame(tick)
}
