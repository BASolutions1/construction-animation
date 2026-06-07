import * as THREE from 'three'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_3EjMedjA9T4i7rgdd5fK2z6G1er/hf_20260605_194441_edc6d425-f0c1-4212-915e-6c71acf66b90.mp4'
const DURATION  = 1.5   // seconds for a full 0→1 traversal

// ── Device detection ─────────────────────────────────────────
const isMobile = window.matchMedia('(max-width: 768px)').matches
const conn     = (navigator as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
const isSlow   = conn ? (conn.saveData === true || conn.effectiveType === '2g' || conn.effectiveType === '3g') : false

// Desktop keeps frame-extraction (butter smooth).
// Mobile uses native video playback — no extraction, no loader, instant start.
const NUM_FRAMES = 120
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

// ── Three.js renderer ────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))

const scene  = new THREE.Scene()
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

// Offscreen canvas — all paths draw here; Three.js CanvasTexture reads it
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

// ── Shared playback state ────────────────────────────────────
let progress  = 0
let isPlaying = false
let playDir   = 0
let playStart = 0
let playFrom  = 0
let ready     = false

// Desktop-only: pre-extracted frames
const frames: ImageBitmap[] = []
let lastIdx = -1

// Mobile-only: live video element
let mobileVid: HTMLVideoElement | null = null
let vidDuration = 0

function maxScroll(): number { return driver.offsetHeight - window.innerHeight }
function inHeroZone(): boolean { return window.scrollY < maxScroll() + 4 }
function easeInOut(t: number): number { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

const PARALLAX_STRENGTH = isMobile ? 0.10 : 0.28

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

function startPlay(dir: 1 | -1): void {
  if (isPlaying && playDir === dir) return
  playDir   = dir
  isPlaying = true
  playStart = 0
  playFrom  = progress

  // Mobile forward: kick off native video playback immediately
  if (isMobile && mobileVid && dir === 1) {
    const speed = vidDuration > 0 ? Math.min(vidDuration / DURATION, 4) : 3
    mobileVid.currentTime  = progress * vidDuration
    mobileVid.playbackRate = speed
    mobileVid.play().catch(() => { /* autoplay blocked - fall back to seeking */ })
  }
  // Mobile reverse: pause and let tick step backward
  if (isMobile && mobileVid && dir === -1) {
    mobileVid.pause()
  }
}

// ── DESKTOP: frame extraction ────────────────────────────────
function seekTo(vid: HTMLVideoElement, time: number): Promise<void> {
  return new Promise<void>(resolve => {
    const handler = (): void => { vid.removeEventListener('seeked', handler); resolve() }
    vid.addEventListener('seeked', handler)
    vid.currentTime = time
  })
}

async function initDesktop(): Promise<void> {
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
  if (loader) { loader.classList.add('done'); setTimeout(() => loader.remove(), 900) }
}

// ── MOBILE: native playback (no extraction, instant start) ───
async function initMobile(): Promise<void> {
  // Hide the loader immediately — no waiting on mobile
  const loader = document.getElementById('frame-loader')
  if (loader) loader.remove()

  const vid       = document.createElement('video')
  vid.src         = VIDEO_URL
  vid.crossOrigin = 'anonymous'
  vid.muted       = true
  vid.playsInline = true
  vid.preload     = 'auto'
  vid.loop        = false

  // Wait until the browser has enough data to display a frame
  await new Promise<void>(resolve => {
    if (vid.readyState >= 3) { resolve(); return }
    vid.addEventListener('canplay', () => resolve(), { once: true })
    vid.load()
  })

  vidDuration = vid.duration

  // Draw first frame so the canvas isn't blank
  await seekTo(vid, 0)
  offCtx.drawImage(vid, 0, 0, CANVAS_W, CANVAS_H)
  canvasTex.needsUpdate     = true
  mat.uniforms.uReady.value = 1.0
  mobileVid                 = vid
  ready                     = true
}

// ── Render loop ──────────────────────────────────────────────
// Reverse step on mobile: how many rAF frames to wait between seeks
// (seeking every frame is too heavy; every 3 frames ≈ 20fps is smooth enough)
const REVERSE_SEEK_INTERVAL = 3
let reverseTick = 0

function tick(now: DOMHighResTimeStamp): void {
  requestAnimationFrame(tick)

  if (!ready) { renderer.render(scene, camera); return }

  // ── Mobile tick ──────────────────────────────────────────
  if (isMobile && mobileVid) {
    if (isPlaying) {
      if (playDir === 1) {
        // Forward: native video drives progress
        progress = Math.min(mobileVid.currentTime / vidDuration, 1)
        offCtx.drawImage(mobileVid, 0, 0, CANVAS_W, CANVAS_H)
        canvasTex.needsUpdate = true

        if (mobileVid.ended || progress >= 0.999) {
          mobileVid.pause()
          progress  = 1
          isPlaying = false
          playStart = 0
          updateHeroUI(1)
        } else {
          window.scrollTo(0, progress * maxScroll())
          updateHeroUI(progress)
        }
      } else {
        // Reverse: step currentTime backward every N frames
        reverseTick++
        if (reverseTick >= REVERSE_SEEK_INTERVAL) {
          reverseTick = 0
          if (playStart === 0) playStart = now
          const elapsed = (now - playStart) / 1000
          const span    = Math.max(playFrom, 0.001)
          const dur     = DURATION * span
          const t       = Math.min(elapsed / dur, 1)
          progress      = Math.max(0, playFrom * (1 - easeInOut(t)))
          mobileVid.currentTime = progress * vidDuration

          window.scrollTo(0, progress * maxScroll())
          updateHeroUI(progress)

          if (t >= 1 || progress <= 0) {
            mobileVid.currentTime = 0
            progress  = 0
            isPlaying = false
            playStart = 0
            updateHeroUI(0)
          }
        }
        offCtx.drawImage(mobileVid, 0, 0, CANVAS_W, CANVAS_H)
        canvasTex.needsUpdate = true
      }
    }

  // ── Desktop tick ─────────────────────────────────────────
  } else if (frames.length > 0) {
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

// ── Input: wheel ─────────────────────────────────────────────
document.addEventListener('wheel', (e: WheelEvent) => {
  if (!inHeroZone()) return
  const dir = e.deltaY > 0 ? 1 : -1
  if (dir === 1  && progress < 1) { e.preventDefault(); startPlay(1)  }
  if (dir === -1 && progress > 0) { e.preventDefault(); startPlay(-1) }
}, { passive: false })

// ── Input: touch ─────────────────────────────────────────────
let touchY0     = 0
let touchLocked = false

document.addEventListener('touchstart', (e: TouchEvent) => {
  touchY0     = e.touches[0].clientY
  touchLocked = false
}, { passive: true })

document.addEventListener('touchmove', (e: TouchEvent) => {
  if (!inHeroZone() || touchLocked || !ready) return
  const dy  = touchY0 - e.touches[0].clientY
  if (Math.abs(dy) < 12) return
  const dir = dy > 0 ? 1 : -1
  if (dir === 1  && progress < 1) { e.preventDefault(); startPlay(1);  touchLocked = true }
  if (dir === -1 && progress > 0) { e.preventDefault(); startPlay(-1); touchLocked = true }
}, { passive: false })

document.addEventListener('touchend', () => { touchLocked = false }, { passive: true })

// ── Scroll: nav sync outside hero ───────────────────────────
window.addEventListener('scroll', () => {
  if (!isPlaying) {
    navEl.className = inHeroZone() ? 'transparent' : 'solid'
    scrollHint.classList.toggle('hidden', window.scrollY > 10)
  }
}, { passive: true })

// ── Boot ─────────────────────────────────────────────────────
export function initHero(): void {
  if (isMobile || isSlow) {
    initMobile()
  } else {
    initDesktop()
  }
  requestAnimationFrame(tick)
}
